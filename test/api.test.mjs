import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, it } from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const source = readFileSync(resolve(root, "dist/remark-gfm.esm.js"), "utf8")
const { remarkGfm, default: remarkGfmDefault } = await import(
  new URL("../dist/remark-gfm.esm.js", import.meta.url)
)

function fakeProcessor() {
  const store = {}
  return {
    store,
    processor: {
      data() {
        return store
      },
    },
  }
}

describe("@itslil/remark-gfm", () => {
  it("exports remarkGfm and default", () => {
    assert.equal(typeof remarkGfm, "function")
    assert.equal(remarkGfmDefault, remarkGfm)
    assert.match(source, / as remarkGfm[},]/)
    assert.match(source, / as default[},]/)
  })

  it("keeps pinned settings keys in the library lane", () => {
    assert.match(source, /(?:\.gfm\s*=|gfm\s*:)/)
    assert.match(source, /(?:\.singleTilde\s*=|singleTilde\s*:)/)
    assert.match(source, /(?:\.settings\s*=|settings\s*:)/)
  })

  it("sets settings.gfm on a fake processor", () => {
    const { store, processor } = fakeProcessor()
    const transform = remarkGfm.call(processor)
    assert.equal(store.settings.gfm, true)
    assert.equal(store.settings.singleTilde, false)
    assert.equal(typeof transform, "function")
  })

  it("forwards options.singleTilde", () => {
    const { store, processor } = fakeProcessor()
    remarkGfm.call(processor, { singleTilde: true })
    assert.equal(store.settings.gfm, true)
    assert.equal(store.settings.singleTilde, true)
  })

  it("works through processor.use(plugin, options)", () => {
    const { store, processor } = fakeProcessor()
    processor.use = function use(plugin, options) {
      return plugin.call(this, options)
    }
    processor.use(remarkGfm, { singleTilde: false })
    assert.equal(store.settings.gfm, true)
  })

  it("creates a data object when the processor has none", () => {
    const processor = {}
    remarkGfm.call(processor)
    assert.equal(typeof processor.data, "function")
    assert.equal(processor.data().settings.gfm, true)
  })

  it("returns a no-op transformer for an already-parsed tree", () => {
    const tree = {
      type: "root",
      children: [{ type: "paragraph", children: [{ type: "text", value: "a | b" }] }],
    }
    const transform = remarkGfm.call({ data() { return {} } })
    const out = transform(tree)
    assert.equal(out, tree)
    assert.equal(tree.children[0].type, "paragraph")
  })
})

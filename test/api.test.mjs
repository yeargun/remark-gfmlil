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

  it("registers micromark and mdast extensions", () => {
    const { store, processor } = fakeProcessor()
    const result = remarkGfm.call(processor)
    assert.equal(result, undefined)
    assert.equal(Array.isArray(store.micromarkExtensions), true)
    assert.equal(store.micromarkExtensions.length, 1)
    assert.equal(typeof store.micromarkExtensions[0], "object")
    assert.equal(Array.isArray(store.fromMarkdownExtensions), true)
    assert.equal(store.fromMarkdownExtensions.length, 1)
    assert.equal(Array.isArray(store.fromMarkdownExtensions[0]), true)
    assert.equal(typeof store.toMarkdownExtensions[0], "object")
    assert.equal(Array.isArray(store.toMarkdownExtensions[0].extensions), true)
  })

  it("forwards options into the GFM combiners", () => {
    const { store, processor } = fakeProcessor()
    remarkGfm.call(processor, { singleTilde: false, tableCellPadding: false })
    assert.equal(store.micromarkExtensions.length, 1)
    assert.equal(store.toMarkdownExtensions.length, 1)
  })

  it("works through processor.use(plugin, options)", () => {
    const { store, processor } = fakeProcessor()
    processor.use = function use(plugin, options) {
      return plugin.call(this, options)
    }
    processor.use(remarkGfm, { singleTilde: true })
    assert.equal(store.micromarkExtensions.length, 1)
  })
})

import assert from "node:assert/strict"
import { createRequire } from "node:module"
import { describe, it } from "node:test"
import { remark } from "remark"

const module = await import("@itslil/remark-gfm")
const commonjs = createRequire(import.meta.url)("@itslil/remark-gfm")
const remarkGfm = module.default

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
  it("exposes the upstream public API", () => {
    assert.deepEqual(Object.keys(module), ["default"])
    assert.deepEqual(Object.keys(commonjs), ["default"])
    assert.equal(typeof remarkGfm, "function")
    assert.equal(typeof commonjs.default, "function")
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

  it("does not start an email autolink after escaped atext", () => {
    const processor = remark().use(remarkGfm)
    const tree = processor.parse("a\\-b@c.co")
    const link = tree.children[0].children[0]
    assert.equal(link.type, "link")
    assert.equal(link.url, "mailto:a-b@c.co")
    assert.equal(link.children[0].value, "a-b@c.co")
    assert.equal(Object.hasOwn(link, "position"), false)
    assert.equal(String(processor.processSync("a\\-b@c.co")), "<a-b@c.co>\n")
  })
})

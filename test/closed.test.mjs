import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { describe, it } from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const closedPath = resolve(root, "dist/remark-gfm.closed.js")

describe("@itslil/remark-gfm closed lane", () => {
  it("ships a closed artifact whose exports stay callable", async () => {
    assert.equal(existsSync(closedPath), true, "dist/remark-gfm.closed.js")
    const closed = await import(pathToFileURL(closedPath).href)
    assert.equal(typeof closed.remarkGfm, "function")
    assert.equal(closed.default, closed.remarkGfm)
    const store = {}
    const transform = closed.remarkGfm.call({
      data() {
        return store
      },
    })
    assert.equal(typeof transform, "function")
    const tree = { type: "root", children: [] }
    assert.equal(transform(tree), tree)
  })
})

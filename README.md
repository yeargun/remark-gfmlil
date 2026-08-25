# @itslil/remark-gfm

remark-gfm reimplemented in LilScript. This is **not** the official [`remark-gfm`](https://github.com/remarkjs/remark-gfm) package.

**Site:** [yeargun.github.io/remark-gfmlil/](https://yeargun.github.io/remark-gfmlil/)

```sh
npm install @itslil/remark-gfm
```

Two compiles ship from the same `.lil` source:

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names and `extern class` keys stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. `extern class` keys may mangle. ESM export names stay so the lane is testable. |

You publish the library lane. The closed artifact is `dist/remark-gfm.closed.js`.

The LilScript compiler lives next door at `../lilscript`.

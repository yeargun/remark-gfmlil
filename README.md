# @itslil/remark-gfm

Official [`remark-gfm@4.0.1`](https://github.com/remarkjs/remark-gfm) algorithms rewritten in LilScript — a real micromark/mdast extension plugin. Full test suite 19/19. Not affiliated with upstream.

**Site:** [yeargun.github.io/remark-gfmlil/](https://yeargun.github.io/remark-gfmlil/)

```sh
npm install @itslil/remark-gfm
```

Two compiles ship from the same `.lil` source:

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names and `extern class` keys stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. `extern class` keys may mangle. ESM export names stay so the lane is testable. |

You publish the library lane. `dist/remark-gfm.closed.js` is diagnostic only.

The LilScript compiler lives next door at `../lilscript`.

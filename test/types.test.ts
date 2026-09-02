import remarkGfm, {type Options} from "@itslil/remark-gfm"
import {unified} from "unified"

const options: Options = {
  firstLineBlank: null,
  singleTilde: false,
  stringLength: undefined,
  tableCellPadding: true,
  tablePipeAlign: null,
}

const result: undefined = remarkGfm(options)
unified().use(remarkGfm, options)

// @ts-expect-error: the upstream package has no named runtime export.
import {remarkGfm as namedRemarkGfm} from "@itslil/remark-gfm"

void result
void namedRemarkGfm

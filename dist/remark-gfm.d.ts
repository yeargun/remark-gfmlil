export interface RemarkGfmOptions {
  singleTilde?: boolean | null
  firstLineBlank?: boolean | null
  tableCellPadding?: boolean | null
  tablePipeAlign?: boolean | null
  stringLength?: (value: string) => number
}

export function remarkGfm(
  this: {
    data: () => {
      micromarkExtensions?: unknown[]
      fromMarkdownExtensions?: unknown[]
      toMarkdownExtensions?: unknown[]
    }
  },
  options?: RemarkGfmOptions | null,
): undefined

export default remarkGfm

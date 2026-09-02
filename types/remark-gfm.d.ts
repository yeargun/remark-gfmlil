export interface Options {
  singleTilde?: boolean | null | undefined
  firstLineBlank?: boolean | null | undefined
  tableCellPadding?: boolean | null | undefined
  tablePipeAlign?: boolean | null | undefined
  stringLength?: ((value: string) => number) | null | undefined
}

export default function remarkGfm(options?: Options | null | undefined): undefined

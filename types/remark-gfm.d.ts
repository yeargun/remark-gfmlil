export interface RemarkGfmOptions {
  singleTilde?: boolean
}

export interface RemarkGfmSettings {
  gfm?: boolean
  singleTilde?: boolean
}

export function remarkGfm(
  this: { data?: (() => { settings?: RemarkGfmSettings }) | { settings?: RemarkGfmSettings } },
  options?: RemarkGfmOptions,
): (tree: unknown, file?: unknown) => unknown

export default remarkGfm

declare module '*.mdx' {
  let MDXComponent: (props) => JSX.Element
  export default MDXComponent
  export const metadata: any
  export const readingTime: { text: string; minutes: number; time: number; words: number }
  export const image: any | undefined
}

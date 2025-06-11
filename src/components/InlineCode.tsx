import '@style/shiki.scss'

import { getHighlightedHtmlFromCode } from '@lib/code'

interface InlineCodeProps {
  code: string
  lang: string
}

export default async function InlineCode({ code, lang }: InlineCodeProps) {
  let codeHtml = await getHighlightedHtmlFromCode(code, lang)

  return <span className='inline-code m-[-1px]' dangerouslySetInnerHTML={{ __html: codeHtml }} />
}

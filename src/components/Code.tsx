import '@style/shiki.scss'

import { getHighlightedHtmlFromCode } from '@lib/code'

interface CodeProps {
  code: string
  lang: string
}

export default async function Code({ code, lang }: CodeProps) {
  let codeHtml = await getHighlightedHtmlFromCode(code, lang)

  return (
    <div className='relative overflow-hidden'>
      <div dangerouslySetInnerHTML={{ __html: codeHtml }} />
    </div>
  )
}

import { createHighlighter } from 'shiki'

import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
  transformerNotationWordHighlight,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerRemoveNotationEscape,
} from '@shikijs/transformers'

const highlighter = await createHighlighter({
  themes: [import('shiki/themes/catppuccin-mocha.mjs')],
  langs: [
    import('shiki/langs/c.mjs'),
    import('shiki/langs/lua.mjs'),
    import('shiki/langs/rust.mjs'),
    import('shiki/langs/html.mjs'),
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/typescript.mjs'),
    import('shiki/langs/css.mjs'),
    import('shiki/langs/nix.mjs'),
    import('shiki/langs/bash.mjs'),
  ],
})

const codeTransformers = [
  transformerNotationDiff(),
  transformerNotationHighlight(),
  transformerNotationFocus(),
  transformerNotationWordHighlight(),
  transformerMetaHighlight(),
  transformerMetaWordHighlight(),
  transformerRemoveNotationEscape(),
]

const languages = highlighter.getLoadedLanguages()

export function isSupportedLanguage(lang: string) {
  return languages.includes(lang)
}

export async function getHighlightedHtmlFromCode(code: string, lang: string) {
  // Strips whitespace from end of lines when using transformers.
  let strippedCode = code.trim().replaceAll(/ +\/\/ \[!code/g, '// [!code')

  let parsingLang = isSupportedLanguage(lang) ? lang : 'text'

  return highlighter.codeToHtml(strippedCode, {
    theme: 'catppuccin-mocha',
    lang: parsingLang,
    transformers: codeTransformers,
  })
}

import Code from '@components/Code'
import InlineCode from '@components/InlineCode'
import { speakers } from '@components/Chat'
import { isSupportedLanguage } from '@lib/code'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: 'div',
    // We leave h1 for the title of the article
    h1: ({ children }) => (
      <h2 className='font-title font-black text-4xl [&_strong]:bg-gradient-to-r [&_strong]:from-primary [&_strong]:to-secondary [&_strong]:bg-clip-text [&_strong]:text-transparent'>
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h3 className='font-title font-black text-3xl [&_strong]:bg-gradient-to-r [&_strong]:from-primary [&_strong]:to-secondary [&_strong]:bg-clip-text [&_strong]:text-transparent'>
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className='font-title font-black text-xl [&_strong]:bg-gradient-to-r [&_strong]:from-primary [&_strong]:to-secondary [&_strong]:bg-clip-text [&_strong]:text-transparent'>
        {children}
      </h4>
    ),
    h4: 'h5',
    h5: 'h6',

    a: ({ children, href }) => (
      <a className='text-primary underline' href={href}>
        {children}
      </a>
    ),

    // Lists
    ul: ({ children }) => <ul className='list-disc list-inside'>{children}</ul>,
    ol: ({ children }) => <ol className='list-decimal list-inside'>{children}</ol>,
    li: ({ children }) => {
      return <li className='[&>ul]:ml-4 [&>ol]:ml-4'>{children}</li>
    },

    // Tables
    th: ({ children }) => <th className='px-2'>{children}</th>,
    td: ({ children }) => <td className='px-2'>{children}</td>,
    thead: ({ children }) => (
      <thead className='bg-secondary leading-10 bg-opacity-10'>{children}</thead>
    ),
    tr: ({ children }) => (
      <tr className='bg-secondary odd:bg-opacity-5 even:bg-opacity-10'>{children}</tr>
    ),
    table: ({ children }) => (
      <div className='overflow-x-scroll rounded-lg border border-secondary border-opacity-15 leading-9'>
        <table className='w-full text-center table-auto'>{children}</table>
      </div>
    ),

    // Inline code blocks
    code: ({ children }) => {
      if (!children || typeof children !== 'string')
        throw new Error('Inline code block cannot be parsed')

      let lang = children.split(' ', 2)[0]
      let code = isSupportedLanguage(lang) ? children.slice(lang.length) : children

      return <InlineCode lang={lang ?? 'text'} code={code} />
    },

    // Block code blocks
    pre: ({ children }) => {
      // Ensure child is a single <code /> element.
      if (!children || typeof children !== 'object' || !('props' in children))
        throw new Error('Code block cannot be parsed')

      // MDX sets className=`language-${lang}` on code blocks for some reason.
      let lang = children.props.className?.split('language-', 2)?.at(1)

      return <Code lang={lang ?? 'text'} code={children.props.children as string} />
    },

    blockquote: ({ children }) => {
      return (
        <blockquote className='border-l-secondary border-opacity-60 border-l-2 pl-4 flex flex-col gap-8'>
          {children}
        </blockquote>
      )
    },

    // Custom elements

    chat: ({ name, children, side }) => {
      if (!(name in speakers)) throw new Error(`Speaker "${name}" is not defined`)

      const Component = speakers[name]
      return <Component side={side}>{children}</Component>
    },

    join: ({ children }) => (
      <div className='flex flex-col overflow-hidden [&>div>div>.shiki]:border-0 [&_.shiki]:bg-[transparent!important] rounded-lg [&_div]:rounded-none [&_div]:border-0 border border-secondary border-opacity-15 leading-normal bg-secondary bg-opacity-10'>
        {children}
      </div>
    ),

    separator: () => <div className='bg-secondary bg-opacity-15 w-full h-[1px]'></div>,

    ...components,
  }
}

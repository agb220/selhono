import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { Media } from '@/payload-types'

export const lexicalConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag as keyof React.JSX.IntrinsicElements

    const headingStyles: Record<string, string> = {
      h1: 'text-3xl md:text-5xl text-dark-200 mt-10 mb-6 ',
      h2: 'h4 md:h1 text-dark-200',
      h3: 'text-xl md:text-3xl text-dark-200 mt-6 mb-3 ',
      h4: 'text-lg md:text-2xl text-dark-200 mt-5 mb-2',
      h5: 'text-base md:text-xl text-dark-200 mt-4 mb-2',
      h6: 'text-sm md:text-lg text-dark-200 mt-3 mb-1',
    }

    return (
      <Tag className={headingStyles[node.tag] || headingStyles.h2}>
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },

  paragraph: ({ node, nodesToJSX }) => {
    return <p className="mb-4 last:mb-0">{nodesToJSX({ nodes: node.children })}</p>
  },

  list: ({ node, nodesToJSX }) => {
    const isOrdered = node.listType === 'number'
    const isCheck = node.listType === 'check'
    const Tag = isOrdered ? 'ol' : 'ul'

    if (isCheck) {
      return <ul className="my-6 space-y-3">{nodesToJSX({ nodes: node.children })}</ul>
    }

    return (
      <Tag
        className={`my-6 space-y-4 pl-6  ${
          isOrdered
            ? 'list-decimal marker:text-gold-300 marker:text-list'
            : 'list-disc marker:text-gold-300 marker:text-list'
        }`}
      >
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },

  listitem: ({ node, nodesToJSX }) => {
    if (node.checked !== undefined) {
      return (
        <li className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={node.checked}
            readOnly
            className="w-5 h-5 accent-gold-300 rounded cursor-default"
          />
          <span>{nodesToJSX({ nodes: node.children })}</span>
        </li>
      )
    }

    return <li className="pl-2">{nodesToJSX({ nodes: node.children })}</li>
  },

  blockquote: ({ node, nodesToJSX }) => {
    return (
      <blockquote className="my-8 p-8 bg-light-200 rounded-3xl border-l-4 border-gold-200 italic">
        {nodesToJSX({ nodes: node.children })}
      </blockquote>
    )
  },

  horizontalrule: () => {
    return <hr className="my-10 border-t border-[#e2e8f0]" />
  },

  upload: ({ node }) => {
    const media = node.value as Media | null | undefined

    // Перевіряємо, чи це дійсно об'єкт і чи є у нього url
    if (!media || typeof media !== 'object' || !('url' in media) || !media.url) {
      return null
    }

    const imageUrl = media.url
    const alt = media.alt || 'Blog Image'

    return (
      <div className="my-8 relative w-full h-[300px] md:h-[480px] rounded-3xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
    )
  },

  link: ({ node, nodesToJSX }) => {
    const href = node.fields?.url || '#'
    const target = node.fields?.newTab ? '_blank' : undefined

    return (
      <Link
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className="text-gold-200 underline underline-offset-4 hover:text-gold-300 transition-colors duration-500"
      >
        {nodesToJSX({ nodes: node.children })}
      </Link>
    )
  },
})

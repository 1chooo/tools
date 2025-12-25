"use client";

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import ThemeToggle from "@/components/theme/theme-toggle"
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-40 shadow-sm saturate-100 backdrop-blur-[10px] border-b border-gray-200 dark:border-gray-800'>
      <div className='mx-auto flex h-[60px] max-w-6xl items-center justify-between px-8'>
        <Link href='/' aria-label='Home' title='Home'>
          <Image
            src="/favicon.ico"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover dark:invert"
            width={40}
            height={40}
          />
        </Link>
        <div className='flex items-center justify-center gap-6'>
          <Link
            href='https://github.com/1chooo/tools'
            className="pl-2.5 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all duration-200 flex items-center gap-2 border border-border shadow-sm"
            target='_blank'
            rel='noreferrer noopener'
            aria-label='GitHub'
          >
            <span className="text-sm font-medium">GitHub</span>
            <FaGithub className="h-6 w-6" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header

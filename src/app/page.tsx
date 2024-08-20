import '@fontsource/exo-2/latin-900.css'

import CodeRing from '@components/CodeRing'
import LinesAnimation from '@components/LinesAnimation'

export default function Home() {
  return (
    <>
      <div className='relative flex h-full w-full items-center overflow-x-clip'>
        <div className='absolute left-0 top-0 z-background h-full w-full overflow-hidden'>
          <LinesAnimation />
          <CodeRing />
        </div>

        <div className='font-800 text-4xl w-[32rem] lg:text-5xl lg:w-[56rem] font-title text-white ml-8 sm:ml-16'>
          <div className='leading-[1.5!important]'>
            I'm Ryan, A{' '}
            <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
              full-stack
            </span>{' '}
            developer based in{' '}
            <span
              className='mask-[flag] inline-block from-primary to-secondary aspect-[1.5/1] h-[1em] bg-gradient-to-r'
              role='img'
              aria-label='the United Kingdom'
            ></span>
            .
          </div>
          <div className='mt-3 inline-flex w-full leading-[2!important] text-3xl lg:text-3xl'>
            Working with&nbsp;
            <div className='relative inline-flex grow overflow-hidden'>
              <div className='flex flex-col scroller-title-[3]'>
                {['NixOS', 'TypeScript', 'Rust'].map((item) => (
                  <div className='flex [white-space-collapse:collapse]'>
                    <div className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent [white-space-collapse:collapse]'>
                      {item}
                    </div>
                    .
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

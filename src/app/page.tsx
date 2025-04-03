import CodeRing from '@components/CodeRing'
import LinesAnimation from '@components/LinesAnimation'
import DotsAnimation from '@components/DotsAnimation'

import Link from 'next/link'
import { technologies } from '@lib/skills'
import SkillsCarousel from '@components/SkillsCarousel'

function MainSection() {
  return (
    <div className='relative flex h-full w-full items-center overflow-x-clip'>
      <div className='absolute left-0 top-0 z-background h-full w-full overflow-hidden'>
        <LinesAnimation />
        <CodeRing />
      </div>

      <div className='font-800 text-4xl w-[32rem] lg:text-5xl lg:w-[56rem] font-title ml-8 sm:ml-16'>
        <div className='leading-[1.5!important]'>
          I'm Ryan, A{' '}
          <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            full-stack
          </span>{' '}
          developer based in{' '}
          <span
            className='mask-flag [mask-size:100%_100%] inline-block from-primary to-secondary aspect-[1.5/1] h-[1em] bg-gradient-to-r'
            role='img'
            aria-label='the United Kingdom'
          />
          .
        </div>
        <div className='mt-3 inline-flex w-full leading-[2!important] text-3xl lg:text-3xl'>
          Working with&nbsp;
          <div className='relative inline-flex grow overflow-hidden'>
            <div className='flex flex-col scroller-title-[5]'>
              {['NixOS', 'TypeScript', 'Rust', 'JavaScript', 'C#'].map((item) => (
                <div key={item} className='flex [white-space-collapse:collapse]'>
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
  )
}

async function MySkillsSection() {
  return (
    <div className='relative w-full'>
      <div className='absolute z-background h-full w-full'>
        <DotsAnimation direction='right' />
      </div>

      <div className='flex flex-col gap-4 justify-center'>
        <div className='font-850 mt-10 font-title text-4xl text-center'>
          My{' '}
          <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            skills
          </span>
          .
        </div>
        <div className='flex flex-col gap-4 mt-10'>
          <SkillsCarousel direction='left' skills={Object.keys(technologies)} />
          <SkillsCarousel direction='right' skills={Object.keys(technologies)} />
          <SkillsCarousel direction='left' skills={Object.keys(technologies)} />
        </div>

        <div className='flex justify-center mb-24'>
          <a
            href='/skills'
            className='flex items-center mt-4 text-xl font-bold gap-2 hover:text-primary hover:bg-primary hover:bg-opacity-30 active:bg-opacity-5 rounded-3xl p-2'
          >
            All skills
            <span className='material-arrow-right bg-current w-8 h-8' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <MainSection />
      <MySkillsSection />
    </>
  )
}

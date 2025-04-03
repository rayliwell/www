import SkillDisplay from '@components/SkillDisplay'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My skills — Rayliwell',
}

export default function Skills() {
  return (
    <div className='container flex flex-col mx-auto gap-16 p-4'>
      <div className='font-850 mt-10 font-title text-5xl text-center'>
        My{' '}
        <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
          skills
        </span>
        .
      </div>
      <div className='pt-2 flex-grow'>
        <SkillDisplay />
      </div>
    </div>
  )
}

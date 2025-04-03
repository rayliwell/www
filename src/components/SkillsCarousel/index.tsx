import { technologies, type Technology } from '@lib/skills'
import TechnologyCard from '@components/TechnologyCard'

import classes from './index.module.scss'
import { type ComponentProps } from 'react'

interface SkillsCarouselProps {
  skills: (keyof typeof technologies)[]
  direction: 'left' | 'right'
}

function SkillList({ skills, direction, ...props }: SkillsCarouselProps & ComponentProps<'div'>) {
  return (
    <div className={`${classes['carousel-' + direction]} flex gap-4 text-nowrap`} {...props}>
      {skills.map((technology) => (
        <TechnologyCard
          key={technology}
          name={technology}
          showRating={false}
          technology={technologies[technology]}
        />
      ))}
    </div>
  )
}

export default async function SkillsCarousel({ skills, direction }: SkillsCarouselProps) {
  let shuffledSkills = skills
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return (
    <div className='overflow-hidden'>
      <div
        style={{ '--carousel-time': skills.length * 2 + 's' } as any}
        className={`flex *:pr-4 ${direction === 'right' ? 'flex-row-reverse' : ''}`}
      >
        <SkillList skills={shuffledSkills} direction={direction} />
        <SkillList skills={shuffledSkills} direction={direction} aria-hidden />
      </div>
    </div>
  )
}

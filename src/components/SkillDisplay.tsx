'use client'

import { categories, technologies, type Category } from '@lib/skills'
import TechnologyCard from './TechnologyCard'
import { useState } from 'react'
import { Rating } from './Rating'

export default function SkillDisplay() {
  const selectClass =
    'border-primary focus:ring-primary focus:border-transparent focus:ring-opacity-60 border-opacity-20 bg-transparent rounded'

  const [currCategory, setCurrCategory] = useState<Category | 'All technologies'>(
    'All technologies'
  )

  const currentTechnologies = Object.entries(technologies)
    .filter(([_, technology]) => {
      return currCategory === 'All technologies' || technology.categories.includes(currCategory)
    })
    .sort(([_a, a], [_b, b]) => b.skill - a.skill)

  return (
    <div className='flex flex-col gap-16'>
      <div className='flex flex-col gap-8 md:flex-row items-center'>
        <div className='flex flex-col gap-8'>
          <div className='inline-flex gap-4 items-center'>
            <Rating value={3} />
            Extremely familiar with this technology and very confident in my ability to use it in
            production
          </div>
          <div className='inline-flex gap-4 items-center'>
            <Rating value={2} />
            Quite familiar with this technology and confident in my ability to use it in production
          </div>
          <div className='inline-flex gap-4 items-center'>
            <Rating value={1} />
            Somewhat familiar with this technology and confident my ability to use it in production
            with guidance
          </div>
        </div>
        <div className='flex w-full justify-around'>
          <select
            value={currCategory}
            onChange={(event) => setCurrCategory(event.currentTarget.value)}
            className={selectClass}
          >
            <option className='bg-black' value='All technologies'>
              All technologies
            </option>
            {categories.map((category) => (
              <option className='bg-black' key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex gap-2 justify-center flex-wrap'>
        {currentTechnologies.map(([name, technology]) => (
          <TechnologyCard key={name} name={name} technology={technology} />
        ))}
      </div>
    </div>
  )
}

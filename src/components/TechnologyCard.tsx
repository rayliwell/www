import { type Technology } from '@lib/skills'
import { Rating } from './Rating'

interface TechnologyCardProps {
  name: string
  technology: Technology
  showRating?: boolean
}

function TechnologyCard({ name, technology, showRating = true }: TechnologyCardProps) {
  return (
    <div className='text-sm p-2 inline-flex items-center justify-center gap-2 rounded-lg border border-secondary border-opacity-15 leading-normal bg-secondary bg-opacity-10'>
      <span className={`w-6 h-6 bg-current ${technology.icon}`} />
      <span>{name}</span>
      {showRating && <Rating value={technology.skill} />}
    </div>
  )
}

export default TechnologyCard

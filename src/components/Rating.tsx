export function Rating({ value }: { value: 1 | 2 | 3 }) {
  return (
    <div className='flex gap-1'>
      <RatingPill active={value >= 1} />
      <RatingPill active={value >= 2} />
      <RatingPill active={value == 3} />
    </div>
  )
}

function RatingPill({ active = false }: { active?: boolean }) {
  return <span className={`bg-primary w-6 h-[0.275rem] rounded-xl ${!active && 'bg-opacity-15'}`} />
}

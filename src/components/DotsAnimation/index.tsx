import classes from './index.module.scss'

export default function DotsAnimation({
  direction,
}: {
  direction: 'left' | 'right' | 'up' | 'down'
}) {
  return <div className={`w-full h-full ${classes.background} ${classes[direction]}`} />
}

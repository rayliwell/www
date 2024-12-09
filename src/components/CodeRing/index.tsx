import classes from './index.module.scss'

export default function CodeRing() {
  return (
    <div
      className={`mask-codering ${classes.codering} pointer-effects-none ring-rotate svg-gradient-to-r from-primary to-secondary absolute aspect-square select-none bg-gradient-to-r brightness-50 md:brightness-100`}
    />
  )
}

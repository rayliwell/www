export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
}

export default function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <button
      className={`flex text-xl m-[-0.5rem] p-[0.5rem] [clip-path:circle()] hover:bg-primary hover:bg-opacity-30 active:bg-opacity-5 *:hover:text-primary`}
      {...props}
    >
      <div className={`bg-current w-8 h-8 ${icon}`} />
    </button>
  )
}

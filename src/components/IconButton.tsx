export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType
}

export default function IconButton({ icon: Icon, ...props }: IconButtonProps) {
  return (
    <button
      className='flex text-xl m-[-0.5rem] p-[0.5rem] [clip-path:circle()] hover:bg-primary hover:bg-opacity-30 active:bg-opacity-5 *:hover:text-primary'
      {...props}
    >
      <Icon />
    </button>
  )
}

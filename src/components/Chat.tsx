interface Speaker {
  component: JSX.Element
  name: string
}

interface ChatProps {
  side?: 'left' | 'right'
  speaker: Speaker
  children: React.ReactNode
}

function withSpeaker(speaker: Speaker) {
  return (props: Omit<ChatProps, 'speaker'>) => {
    return <Chat {...props} speaker={speaker}></Chat>
  }
}

export const speakers: Record<string, ReturnType<typeof withSpeaker>> = {
  primary: withSpeaker({
    name: 'Primary speaker',
    component: (
      <div className='shrink-0 bg-primary bg-opacity-5 [clip-path:circle()] overflow-hidden'>
        <div className='mask-icon bg-gradient-to-r from-primary to-secondary w-8 h-8 m-2' />
      </div>
    ),
  }),
  secondary: withSpeaker({
    name: 'Secondary speaker',
    component: (
      <div className='shrink-0 bg-primary bg-opacity-5 [clip-path:circle()] overflow-hidden'>
        <div className='material-account bg-gradient-to-r from-primary to-secondary w-12 h-12 translate-y-2' />
      </div>
    ),
  }),
}

export default function Chat({ side = 'left', children, speaker }: ChatProps) {
  return (
    <div className={'flex gap-3 items-end ' + (side === 'left' ? 'flex-row' : 'flex-row-reverse')}>
      {speaker.component}
      <div
        className={
          'grow flex min-w-0 padding-4 ' + (side === 'left' ? 'justify-start' : 'justify-end')
        }
      >
        <div className='flex min-w-0 flex-col gap-3 bg-secondary bg-opacity-10 rounded-xl border border-secondary border-opacity-10 p-4'>
          <div>
            <span className='font-bold from-primary to-secondary bg-clip-text text-transparent bg-gradient-to-r'>
              {speaker.name}
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

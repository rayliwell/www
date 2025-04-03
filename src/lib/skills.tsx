export const categories: string[] = ['Web technologies', 'Deployment', 'Back-end'] as const

export type Category = (typeof categories)[number]

export type Technologies = Record<string, Technology>

export interface Technology {
  categories: Category[]
  icon: string
  skill: 1 | 2 | 3
}

export const technologies: Technologies = {
  Docker: {
    categories: ['Deployment'],
    icon: 'logos-docker',
    skill: 3,
  },
  NixOS: {
    categories: ['Deployment'],
    icon: 'logos-nixos',
    skill: 3,
  },
  TypeScript: {
    categories: ['Web technologies', 'Back-end'],
    icon: 'logos-typescript',
    skill: 3,
  },
  Python: {
    categories: ['Back-end'],
    icon: 'logos-python',
    skill: 3,
  },
  'Tailwind CSS': {
    categories: ['Web technologies'],
    icon: 'logos-tailwindcss',
    skill: 3,
  },
  JavaScript: {
    categories: ['Web technologies', 'Back-end'],
    icon: 'logos-javascript',
    skill: 3,
  },
  React: {
    categories: ['Web technologies'],
    icon: 'logos-react',
    skill: 3,
  },
  'Next.js': {
    categories: ['Web technologies', 'Back-end'],
    icon: 'logos-nextdotjs',
    skill: 3,
  },
  SolidJS: {
    categories: ['Web technologies'],
    icon: 'logos-solid',
    skill: 2,
  },
  Rust: {
    categories: ['Back-end'],
    icon: 'logos-rust',
    skill: 2,
  },
  Git: {
    categories: ['Deployment'],
    icon: 'logos-git',
    skill: 3,
  },
  Go: {
    categories: ['Back-end'],
    icon: 'logos-go',
    skill: 1,
  },
  Redux: {
    categories: ['Web technolgies'],
    icon: 'logos-redux',
    skill: 2,
  },
  Nix: {
    categories: ['Deployment'],
    icon: 'logos-nixos',
    skill: 3,
  },
  'Github actions': {
    categories: ['Deployment'],
    icon: 'logos-github',
    skill: 2,
  },
  Linux: {
    categories: ['Back-end', 'Deployment'],
    icon: 'logos-linux',
    skill: 3,
  },
  Java: {
    categories: ['Back-end'],
    icon: 'logos-openjdk',
    skill: 1,
  },
  'C#': {
    categories: ['Back-end'],
    icon: 'logos-csharp',
    skill: 3,
  },
  'ASP.NET': {
    categories: ['Back-end'],
    icon: 'logos-dotnet',
    skill: 2,
  },
  MySQL: {
    categories: ['Back-end'],
    icon: 'logos-mariadb',
    skill: 2,
  },
  Cloudflare: {
    categories: ['Back-end', 'Deployment'],
    icon: 'logos-cloudflare',
    skill: 2,
  },
  'Amazon S3': {
    categories: ['Back-end'],
    icon: 'logos-amazons3',
    skill: 3,
  },
  PostgreSQL: {
    categories: ['Back-end'],
    icon: 'logos-postgresql',
    skill: 3,
  },
  MongoDB: {
    categories: ['Back-end'],
    icon: 'logos-mongodb',
    skill: 1,
  },
  Redis: {
    categories: ['Back-end'],
    icon: 'logos-redis',
    skill: 2,
  },
  Kafka: {
    categories: ['Back-end'],
    icon: 'logos-apachekafka',
    skill: 1,
  },
} as const

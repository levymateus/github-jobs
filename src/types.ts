export type Job = {
  id: string
  src?: string
  company: string
  title: string
  fulltime?: boolean
  location: string[]
  published: string
  description: string
}

export type Response = { count: number, jobs: Job[] }

export type SeachTerms = 'title' | 'company' | 'expertise' | 'benefits' | 'city' | 'state' | 'zip' | 'country' | 'fulltime';

export type Field = {
  name: string
  value: string
  checked?: boolean
};

export type ProjectType = {
    title: string,
    description: string,
}

export type DeveloperType = {
    name: string,
    email: string,
}

export type ProjectResType = {
  id: string,
  title: string,
  description: string,
  developers: DeveloperType[]
}

export type DeveloperResType = {
  id: string,
  name: string,
  email: string,
  projects: ProjectType[]
}

export type ProjectTableType = {
  key: string,
  title: string,
  description: string,
  developers: string
}

export type DeveloperTableType = {
  key: string,
  name: string,
  email: string,
  projects: string,
}
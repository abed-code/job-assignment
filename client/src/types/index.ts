export interface Auth {
  access_token: string
  scope: string
  token_type: string
}

export interface User {
  login: string
  id: number
}

export interface Repo {
  id: string
  name: string
  private: boolean
  description?: string
}

export interface CreateRepoBody {
  name: string
  description?: string
  homepage?: string
  private?: boolean
}

export interface UpdateRepoBody {
  name: string
  description?: string
  homepage?: string
  private?: boolean
  has_issues?: boolean
  has_projects?: boolean
  has_wiki?: boolean
}

export enum RepoMode {
  Create = "create",
  Update = "update",
  Delete = "delete",
}
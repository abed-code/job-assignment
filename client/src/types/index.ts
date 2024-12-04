export interface Auth {
  access_token: string
  scope: string
  token_type: string
}

export interface User {
  login: string
  id: number
}

export interface Branch {
  name: string
  commit: {
    sha: string
    url: string
  },
  protected: boolean
}

export interface Repo {
  id: string
  name: string
  private: boolean
  description?: string
  branches?: Branch[]
  branchesFecthed?: boolean
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

export enum RepoActionMode {
  Create = "create",
  Update = "update",
  Delete = "delete",
}

export enum BranchActionMode {
  Read = "read",
  Create = "create",
  Delete = "delete",
  Commit = "commit",
}

export interface CommitBody {
  message: string
  filename: string
  content: string
}

export interface Content {
  download_url: string
  git_url: string
  html_url: string
  name: string
  path: string
  sha: string
  size: number
  type: string
  url: string
}

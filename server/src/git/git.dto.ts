
export interface OAuthDto {
  client_id: string
  client_secret: string
  code: string
}

export interface CreateRepoDto {
  name: string
  description?: string
  homepage?: string
  private?: boolean
}

export interface UpdateRepoDto {
  name: string
  description?: string
  homepage?: string
  private?: boolean
  has_issues?: boolean
  has_projects?: boolean
  has_wiki?: boolean
}

export interface CommitDto {
  message: string
  filename: string
  content: string
}
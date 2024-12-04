import { Auth, Branch, CommitBody, CreateRepoBody, Repo, UpdateRepoBody, User } from "../types"

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
const BASE_URL = 'http://localhost:3001/git'

export const GithubApi = {
  auth: async (code: string) => {
    try {
      const res = await fetch(`${BASE_URL}/auth`, {
        method: "POST",
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      })
  
      const data = await res.json() as Auth

      if(data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  },
  fetchUser: async (token: string): Promise<User> => {
    try {
      const res = await fetch(`${BASE_URL}/user`, {
        headers: { token }
      })
      const data = await res.json()
      return data
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  },
  fetchRepos: async (token: string, username: string): Promise<Repo[]> => {
    try {
      const res = await fetch(`${BASE_URL}/repos/${username}`, {
        headers: { token }
      })
      
      const data = await res.json()
      return data.repos
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  },
  createRepo: async (token: string, body: CreateRepoBody): Promise<Repo> => {
    try {
      const res = await fetch(`${BASE_URL}/repos`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 
          token, 
          "Content-Type": "application/json",
        }
      })
      
      const data = await res.json()
      return data.repo
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  },
  updateRepo: async (token: string, owner: string, repo: string, body: UpdateRepoBody): Promise<Repo> => {
    try {
      const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: { 
          token, 
          "Content-Type": "application/json",
        }
      })
      
      const data = await res.json()
      return data.repo
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  },
  deleteRepo: async (token: string, owner: string, repo: string) => {
    try {
      const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, {
        method: "DELETE",
        headers: { 
          token, 
          "Content-Type": "application/json",
        }
      })
      
      const data = await res.json()
      return data
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  },
  fetchBranches: async (token: string, owner: string, repo: string): Promise<Branch[]> => {
    try {
      const res = await fetch(`${BASE_URL}/branches/${owner}/${repo}`, {
        headers: { token }
      })
      
      const data = await res.json()

      return data.branches
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  },
  createBranches: async (token: string, owner: string, repo: string, branch: string): Promise<Branch> => {
    try {
      const res = await fetch(`${BASE_URL}/branches/${owner}/${repo}/${branch}`, {
        method: "POST",
        headers: { token }
      })
      
      const data = await res.json()

      return data
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  },
  deleteBranch: async (token: string, owner: string, repo: string, branch: string) => {
    try {
      const res = await fetch(`${BASE_URL}/branches/${owner}/${repo}/${branch}`, {
        method: "DELETE",
        headers: { token }
      })
      
      const data = await res.json()

      return data
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  },
  commit: async (
    token: string, 
    owner: string, 
    repo: string, 
    branch: string, 
    body: CommitBody
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/commit/${owner}/${repo}/${branch}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 
          token,
          "Content-Type": "application/json",
        }
      })
      
      const data = await res.json()

      return data
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  },
  fetchBranchContent: async (token: string, owner: string, repo: string, branch: string) => {
    try {
      const res = await fetch(`${BASE_URL}/branches/${owner}/${repo}/${branch}/contents`, {
        method: "GET",
        headers: {
          token,
          "Content-Type": "application/json",
        }
      })
      
      const data = await res.json()

      return data
    } catch(e: unknown) {
      throw new Error((e as Error).message)
    }
  }
}
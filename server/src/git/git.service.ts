import { Injectable } from '@nestjs/common';
import GithubApi from './api';
import { CommitDto, CreateRepoDto, OAuthDto, UpdateRepoDto } from './git.dto';
import axios from 'axios';

@Injectable()
export class GitService {
  auth(data: OAuthDto) {
    return axios.post('https://github.com/login/oauth/access_token', data, {
      headers: {
        Accept: 'application/json',
      },
    })
  }

  fetchUser(token: string) {
    return GithubApi.get('user', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  fetchRepos(token: string, username: string) {
    return GithubApi.get(`users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  createRepo(token: string, data: CreateRepoDto) {
    return GithubApi.post('/user/repos', { 
      ...data,
      homepage:"https://github.com",
      auto_init: true,
    }, {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    })
  }

  updateRepo(token: string, owner: string, repo: string, data: UpdateRepoDto) {
    return GithubApi.patch(`/repos/${owner}/${repo}`, data, {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteRepo(token: string, owner: string, repo: string) {
    return GithubApi.delete(`/repos/${owner}/${repo}`, {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    })
  }

  fetchBranches(token: string, owner: string, repo: string) {
    return GithubApi.get(`/repos/${owner}/${repo}/branches`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  async createBranch(token: string, owner: string, repo: string, branch: string) {
    const commitRes = await GithubApi.get(`/repos/${owner}/${repo}/commits/main`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return GithubApi.post(`/repos/${owner}/${repo}/git/refs`, {
      ref: `refs/heads/${branch}`,
      sha: commitRes.data.sha
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteBranch(token: string, owner: string, repo: string, branch: string) {
    return GithubApi.delete(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  async commit(
    token: string, 
    owner: string, 
    repo: string, 
    branch: string, 
    commitDto: CommitDto
  ) {
    try {
      const commitRes = await GithubApi.get(`/repos/${owner}/${repo}/commits/${branch}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    
      const treeRes = await GithubApi.post(`/repos/${owner}/${repo}/git/trees`, {
        "tree": [
          {
            "path": commitDto.filename,
            "mode": "100644", 
            "type": "blob",
            "content": commitDto.content
          }
        ],
        "base_tree": commitRes.data.sha
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })


      const newCommitRes = await GithubApi.post(`/repos/${owner}/${repo}/git/commits`, {
        "message": commitDto.content,
        "tree": treeRes.data.sha,
        "parents": [commitRes.data.sha]
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      await GithubApi.post(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        sha: newCommitRes.data.sha,
        force: true
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {}
    } catch(error) {
      console.error(error.response)
      throw new Error(error)
    }
  }

  fetchBranchContent(token: string, owner: string, repo: string, branch: string) {
    return GithubApi.get(`/repos/${owner}/${repo}/contents?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

import { Injectable } from '@nestjs/common';
import GithubApi from './api';
import { CreateRepoDto, OAuthDto, UpdateRepoDto } from './git.dto';
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
    return GithubApi.post('/user/repos', data, {
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
}

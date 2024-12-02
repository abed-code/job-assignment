import { Injectable } from '@nestjs/common';
import GithubApi from './api';

@Injectable()
export class GitService {
  gitRepos(username: string) {
    return GithubApi.get(`users/${username}/repos`)
  }
}

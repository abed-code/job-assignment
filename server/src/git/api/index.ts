import axios from "axios";

const GithubApi = axios.create({
  baseURL: 'https://api.github.com/'
});

const GIT_ACCESS_TOKEN = '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'

GithubApi.defaults.headers.common['Accept'] = 'application/vnd.github+json';
GithubApi.defaults.headers.common['Authorization'] = `Bearer ${GIT_ACCESS_TOKEN}`;
GithubApi.defaults.headers.common['X-GitHub-Api-Version'] = '2022-11-28';

export default GithubApi
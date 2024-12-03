import axios from "axios";

const GithubApi = axios.create({
  baseURL: 'https://api.github.com/'
});

GithubApi.defaults.headers.common['Accept'] = 'application/vnd.github+json';
GithubApi.defaults.headers.common['X-GitHub-Api-Version'] = '2022-11-28';

export default GithubApi
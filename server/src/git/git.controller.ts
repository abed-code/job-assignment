import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { GitService } from './git.service';
import { CreateRepoDto, OAuthDto, UpdateRepoDto } from './git.dto';

@Controller('git')
export class GitController {
  constructor(private readonly gitService: GitService) {}

  @Post('auth')
  async auth(@Body() authDto: OAuthDto) {
    try {
      const res = await this.gitService.auth(authDto);
      return res.data;
    } catch(error) {
      console.error(error.response.data)
      throw error
    }
  }

  @Get('user')
  async getUser(@Headers('token') token: string) {
    try {
      const res = await this.gitService.fetchUser(token)
      return res.data;
    } catch(error) {
      console.error(error.response.data)
      throw error
    }
  }

  @Get('repos/:username')
  async getRepos(@Param('username') username: string, @Headers('token') token: string) {
    try {
      const res = await this.gitService.fetchRepos(token, username);
      return { repos: res.data };
    } catch(error) {
      console.error(error.response.data)
      throw error
    }
  }

  @Post('repos')
  async createRepo(@Headers('token') token: string, @Body() createRepoDto: CreateRepoDto) {
    try { 
      const res = await this.gitService.createRepo(token, createRepoDto)
      return { repo: res.data };
    } catch(error) {
      console.error(error.response.data)
      throw error
    }
  }

  @Patch('repos/:owner/:repo')
  async updateRepo(
    @Headers('token') token: string,
    @Param('owner') owner: string,
    @Param('repo') repo: string,
    @Body() updateRepoDto: UpdateRepoDto
  ) {
    try { 
      const res = await this.gitService.updateRepo(token, owner, repo, updateRepoDto)
      return { repo: res.data };
    } catch(error) {
      console.error(error.response.data)
      throw error
    }
  }

  @Delete('repos/:owner/:repo')
  async deleteRepo(
    @Headers('token') token: string,
    @Param('owner') owner: string,
    @Param('repo') repo: string
  ) {
    try { 
      await this.gitService.deleteRepo(token, owner, repo)

      return { message: "delete repo successfully" }
    } catch(error) {
      console.error(error.response.data)
      throw error
    }
  }
}

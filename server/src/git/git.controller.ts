import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { GitService } from './git.service';
import { CommitDto, CreateRepoDto, OAuthDto, UpdateRepoDto } from './git.dto';

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

  @Get('branches/:owner/:repo')
  async getBranches(
    @Headers('token') token: string,
    @Param('owner') owner: string,
    @Param('repo') repo: string
  ) {
    try {
      const res = await this.gitService.fetchBranches(token, owner, repo);
      return { branches: res.data };
    } catch(error) {
      console.error(error.response.data)
      throw error
    }
  }

  @Post('branches/:owner/:repo/:branch')
  async createBranch(
    @Headers('token') token: string,
    @Param('owner') owner: string,
    @Param('repo') repo: string,
    @Param('branch') branch: string,
  ) {
    try {
      const res = await this.gitService.createBranch(token, owner, repo, branch);
      return { branch: res.data };
    } catch(error) {
      console.error(error.response.data)
      throw error
    }
  }

  @Delete('branches/:owner/:repo/:branch')
  async deleteBranch(
    @Headers('token') token: string,
    @Param('owner') owner: string,
    @Param('repo') repo: string,
    @Param('branch') branch: string,
  ) {
    try {
      const res = await this.gitService.deleteBranch(token, owner, repo, branch);
      return { branch: res.data };
    } catch(error) {
      console.error(error.response.data)
      throw error
    }
  }

  @Post('commit/:owner/:repo/:branch')
  async commit(
    @Headers('token') token: string,
    @Param('owner') owner: string,
    @Param('repo') repo: string,
    @Param('branch') branch: string,
    @Body() commitDto: CommitDto,
  ) {
    try {
      return await this.gitService.commit(token, owner, repo, branch, commitDto);
    } catch(error) {
      console.error(error)
      throw error
    }
  }

  @Get('branches/:owner/:repo/:branch/contents')
  async fetchBranchContent(
    @Headers('token') token: string,
    @Param('owner') owner: string,
    @Param('repo') repo: string,
    @Param('branch') branch: string
  ) {
    try {
      const res = await this.gitService.fetchBranchContent(token, owner, repo, branch)
      return { contents: res.data };
    } catch(error) {
      console.error(error.response.data)
      throw error
    }
  }
}

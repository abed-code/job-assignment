import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GitService } from './git.service';

@Controller('repos')
export class GitController {
  constructor(private readonly gitService: GitService) {}

  @Get(':username')
  async gitRepos(@Param('username') username: string) {
    try {
      const res = await this.gitService.gitRepos(username);
      return {
        repos: res.data
      };
    } catch(e) {
      console.error(e)
      return { text: 'something went wrong!', message: e }
    }
  }

  // @Get()
  // findAll() {
  //   return this.gitService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.gitService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string) {
  //   return this.gitService.update(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.gitService.remove(+id);
  // }
}

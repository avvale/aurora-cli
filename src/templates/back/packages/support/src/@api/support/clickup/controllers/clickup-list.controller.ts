/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ClickupListHandler } from '@api/support/clickup';
import { Auth } from '@aurora/decorators';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClickupListDto } from '../dto';

@ApiTags('[clickup] list')
@Controller('clickup/folder/:folderId/list')
@Auth('clickup.list.get')
export class ClickupListController {
  constructor(private readonly handler: ClickupListHandler) {}

  @Get()
  @ApiOperation({ summary: 'Defines the operation of this controller' })
  @ApiCreatedResponse({
    description: 'Defines the action performed',
    type: [ClickupListDto],
  })
  async main(@Param('folderId') folderId?: string) {
    return await this.handler.main(folderId);
  }
}

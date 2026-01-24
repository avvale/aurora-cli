/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IamUserMetaDto } from '../dto';

// @app
import { IamFindUserMetaByIdHandler } from '../handlers/iam-find-user-meta-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user-data/find')
@Auth('iam.userData.get')
export class IamFindUserMetaByIdController {
  constructor(private readonly handler: IamFindUserMetaByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find user data by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: IamUserMetaDto,
  })
  async main(@Param('id') id: string, @Timezone() timezone?: string) {
    return await this.handler.main(id, timezone);
  }
}

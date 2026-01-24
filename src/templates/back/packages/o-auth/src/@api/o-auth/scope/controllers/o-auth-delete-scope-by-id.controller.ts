/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthDeleteScopeByIdHandler, OAuthScopeDto } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/delete')
@Auth('oAuth.scope.delete')
export class OAuthDeleteScopeByIdController {
  constructor(private readonly handler: OAuthDeleteScopeByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete scope by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: OAuthScopeDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}

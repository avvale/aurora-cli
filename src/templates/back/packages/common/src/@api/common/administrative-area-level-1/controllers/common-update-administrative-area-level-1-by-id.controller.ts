/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAdministrativeAreaLevel1Dto,
  CommonUpdateAdministrativeAreaLevel1ByIdDto,
  CommonUpdateAdministrativeAreaLevel1ByIdHandler,
} from '@api/common/administrative-area-level-1';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/update')
@Auth('common.administrativeAreaLevel1.update')
export class CommonUpdateAdministrativeAreaLevel1ByIdController {
  constructor(
    private readonly handler: CommonUpdateAdministrativeAreaLevel1ByIdHandler,
  ) {}

  @Put()
  @ApiOperation({ summary: 'Update administrative-area-level-1 by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: CommonAdministrativeAreaLevel1Dto,
  })
  async main(
    @Body() payload: CommonUpdateAdministrativeAreaLevel1ByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}

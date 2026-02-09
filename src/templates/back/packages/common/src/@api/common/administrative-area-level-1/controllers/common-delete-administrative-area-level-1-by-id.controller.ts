/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel1Dto,
  CommonDeleteAdministrativeAreaLevel1ByIdHandler,
} from '@api/common/administrative-area-level-1';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/delete')
@Auth('common.administrativeAreaLevel1.delete')
export class CommonDeleteAdministrativeAreaLevel1ByIdController {
  constructor(
    private readonly handler: CommonDeleteAdministrativeAreaLevel1ByIdHandler,
  ) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete administrative-area-level-1 by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: CommonAdministrativeAreaLevel1Dto,
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

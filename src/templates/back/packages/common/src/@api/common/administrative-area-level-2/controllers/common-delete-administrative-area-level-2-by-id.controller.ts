/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2Dto,
  CommonDeleteAdministrativeAreaLevel2ByIdHandler,
} from '@api/common/administrative-area-level-2';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2/delete')
@Auth('common.administrativeAreaLevel2.delete')
export class CommonDeleteAdministrativeAreaLevel2ByIdController {
  constructor(
    private readonly handler: CommonDeleteAdministrativeAreaLevel2ByIdHandler,
  ) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete administrative-area-level-2 by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: CommonAdministrativeAreaLevel2Dto,
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

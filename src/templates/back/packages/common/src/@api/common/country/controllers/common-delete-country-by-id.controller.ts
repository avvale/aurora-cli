/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCountryDto,
  CommonDeleteCountryByIdHandler,
} from '@api/common/country';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  ContentLanguage,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] country')
@Controller('common/country/delete')
@Auth('common.country.delete')
export class CommonDeleteCountryByIdController {
  constructor(private readonly handler: CommonDeleteCountryByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete country by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: CommonCountryDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @ContentLanguage() contentLanguage?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      id,
      constraint,
      timezone,
      contentLanguage,
      auditing,
    );
  }
}

/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonCountryDto } from '../dto';
import { CommonAdministrativeAreasCountryHandler } from '../handlers/common-administrative-areas-country.handler';

@ApiTags('[common] country')
@Controller('common/country/administrative-areas')
@Auth('common.country.get')
export class CommonAdministrativeAreasCountryController {
  constructor(
    private readonly handler: CommonAdministrativeAreasCountryHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Defines the operation of this controller' })
  @ApiCreatedResponse({
    description: 'Defines the action performed',
    type: [CommonCountryDto],
  })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}

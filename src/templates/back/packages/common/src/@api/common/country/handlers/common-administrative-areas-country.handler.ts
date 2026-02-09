/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonCountry } from '@api/graphql';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonAdministrativeAreasCountryHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonCountry[] | CommonCountryDto[]> {
    // coding here
    /* await this.commandBus.dispatch(new YourCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));
        await this.queryBus.ask(new YourQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        )); */

    return [];
  }
}

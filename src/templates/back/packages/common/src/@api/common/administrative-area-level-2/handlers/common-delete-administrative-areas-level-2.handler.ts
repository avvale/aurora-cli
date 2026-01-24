import { CommonAdministrativeAreaLevel2Dto } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import {
  CommonDeleteAdministrativeAreasLevel2Command,
  CommonGetAdministrativeAreasLevel2Query,
} from '@app/common/administrative-area-level-2';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAdministrativeAreasLevel2Handler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<
    CommonAdministrativeAreaLevel2[] | CommonAdministrativeAreaLevel2Dto[]
  > {
    const administrativeAreasLevel2 = await this.queryBus.ask(
      new CommonGetAdministrativeAreasLevel2Query(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new CommonDeleteAdministrativeAreasLevel2Command(
        queryStatement,
        constraint,
        {
          timezone,
          repositoryOptions: {
            auditing,
          },
        },
      ),
    );

    return administrativeAreasLevel2;
  }
}

/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { Pagination } from '@api/graphql';
import { CommonPaginateAdministrativeAreasLevel2Query } from '@app/common/administrative-area-level-2';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAdministrativeAreasLevel2Handler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new CommonPaginateAdministrativeAreasLevel2Query(
        queryStatement,
        constraint,
        {
          timezone,
        },
      ),
    );
  }
}

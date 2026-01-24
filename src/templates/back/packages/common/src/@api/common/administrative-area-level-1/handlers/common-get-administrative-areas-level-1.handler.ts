import { CommonAdministrativeAreaLevel1Dto } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';
import { CommonGetAdministrativeAreasLevel1Query } from '@app/common/administrative-area-level-1';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetAdministrativeAreasLevel1Handler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<
    CommonAdministrativeAreaLevel1[] | CommonAdministrativeAreaLevel1Dto[]
  > {
    return await this.queryBus.ask(
      new CommonGetAdministrativeAreasLevel1Query(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}

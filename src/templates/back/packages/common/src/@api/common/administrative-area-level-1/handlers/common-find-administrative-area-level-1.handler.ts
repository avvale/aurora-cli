/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';
import { CommonFindAdministrativeAreaLevel1Query } from '@app/common/administrative-area-level-1';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonFindAdministrativeAreaLevel1Handler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonAdministrativeAreaLevel1> {
    const administrativeAreaLevel1 = await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel1Query(queryStatement, constraint, {
        timezone,
      }),
    );

    if (!administrativeAreaLevel1) {
      throw new NotFoundException(`CommonAdministrativeAreaLevel1 not found`);
    }

    return administrativeAreaLevel1;
  }
}

import { CommonAdministrativeAreaLevel2Dto } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { CommonFindAdministrativeAreaLevel2ByIdQuery } from '@app/common/administrative-area-level-2';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAdministrativeAreaLevel2ByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<
    CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto
  > {
    return await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel2ByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}

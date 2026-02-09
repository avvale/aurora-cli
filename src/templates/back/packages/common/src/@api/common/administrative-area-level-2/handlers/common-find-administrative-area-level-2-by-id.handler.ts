/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { CommonFindAdministrativeAreaLevel2ByIdQuery } from '@app/common/administrative-area-level-2';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonFindAdministrativeAreaLevel2ByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonAdministrativeAreaLevel2> {
    const administrativeAreaLevel2 = await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel2ByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!administrativeAreaLevel2) {
      throw new NotFoundException(
        `CommonAdministrativeAreaLevel2 with id: ${id}, not found`,
      );
    }

    return administrativeAreaLevel2;
  }
}

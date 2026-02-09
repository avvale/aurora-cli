/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { CommonFindAdministrativeAreaLevel3ByIdQuery } from '@app/common/administrative-area-level-3';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonFindAdministrativeAreaLevel3ByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonAdministrativeAreaLevel3> {
    const administrativeAreaLevel3 = await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel3ByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!administrativeAreaLevel3) {
      throw new NotFoundException(
        `CommonAdministrativeAreaLevel3 with id: ${id}, not found`,
      );
    }

    return administrativeAreaLevel3;
  }
}

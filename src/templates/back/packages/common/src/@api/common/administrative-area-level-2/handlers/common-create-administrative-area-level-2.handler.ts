import {
  CommonAdministrativeAreaLevel2Dto,
  CommonCreateAdministrativeAreaLevel2Dto,
} from '@api/common/administrative-area-level-2';
import {
  CommonAdministrativeAreaLevel2,
  CommonCreateAdministrativeAreaLevel2Input,
} from '@api/graphql';
import {
  CommonCreateAdministrativeAreaLevel2Command,
  CommonFindAdministrativeAreaLevel2ByIdQuery,
} from '@app/common/administrative-area-level-2';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAdministrativeAreaLevel2Handler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload:
      | CommonCreateAdministrativeAreaLevel2Input
      | CommonCreateAdministrativeAreaLevel2Dto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<
    CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto
  > {
    await this.commandBus.dispatch(
      new CommonCreateAdministrativeAreaLevel2Command(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel2ByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}

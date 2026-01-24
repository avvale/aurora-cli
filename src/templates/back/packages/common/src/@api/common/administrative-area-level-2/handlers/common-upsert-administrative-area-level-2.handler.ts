import {
  CommonAdministrativeAreaLevel2Dto,
  CommonUpdateAdministrativeAreaLevel2ByIdDto,
} from '@api/common/administrative-area-level-2';
import {
  CommonAdministrativeAreaLevel2,
  CommonUpdateAdministrativeAreaLevel2ByIdInput,
} from '@api/graphql';
import {
  CommonFindAdministrativeAreaLevel2ByIdQuery,
  CommonUpsertAdministrativeAreaLevel2Command,
} from '@app/common/administrative-area-level-2';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpsertAdministrativeAreaLevel2Handler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload:
      | CommonUpdateAdministrativeAreaLevel2ByIdInput
      | CommonUpdateAdministrativeAreaLevel2ByIdDto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<
    CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto
  > {
    await this.commandBus.dispatch(
      new CommonUpsertAdministrativeAreaLevel2Command(payload, {
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

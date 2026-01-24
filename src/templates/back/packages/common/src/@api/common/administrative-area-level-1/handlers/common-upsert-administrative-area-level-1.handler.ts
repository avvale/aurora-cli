import {
  CommonAdministrativeAreaLevel1Dto,
  CommonUpdateAdministrativeAreaLevel1ByIdDto,
} from '@api/common/administrative-area-level-1';
import {
  CommonAdministrativeAreaLevel1,
  CommonUpdateAdministrativeAreaLevel1ByIdInput,
} from '@api/graphql';
import {
  CommonFindAdministrativeAreaLevel1ByIdQuery,
  CommonUpsertAdministrativeAreaLevel1Command,
} from '@app/common/administrative-area-level-1';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpsertAdministrativeAreaLevel1Handler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload:
      | CommonUpdateAdministrativeAreaLevel1ByIdInput
      | CommonUpdateAdministrativeAreaLevel1ByIdDto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<
    CommonAdministrativeAreaLevel1 | CommonAdministrativeAreaLevel1Dto
  > {
    await this.commandBus.dispatch(
      new CommonUpsertAdministrativeAreaLevel1Command(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel1ByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}

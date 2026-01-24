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
  CommonUpdateAdministrativeAreaLevel1ByIdCommand,
} from '@app/common/administrative-area-level-1';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
  diff,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAdministrativeAreaLevel1ByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload:
      | CommonUpdateAdministrativeAreaLevel1ByIdInput
      | CommonUpdateAdministrativeAreaLevel1ByIdDto,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<
    CommonAdministrativeAreaLevel1 | CommonAdministrativeAreaLevel1Dto
  > {
    const administrativeAreaLevel1 = await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel1ByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    const dataToUpdate = diff(payload, administrativeAreaLevel1);

    await this.commandBus.dispatch(
      new CommonUpdateAdministrativeAreaLevel1ByIdCommand(
        {
          ...dataToUpdate,
          id: payload.id,
        },
        constraint,
        {
          timezone,
          repositoryOptions: {
            auditing,
          },
        },
      ),
    );

    return await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel1ByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}

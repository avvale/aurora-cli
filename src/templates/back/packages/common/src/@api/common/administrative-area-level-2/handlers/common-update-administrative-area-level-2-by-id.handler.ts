/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2,
  CommonUpdateAdministrativeAreaLevel2ByIdInput,
} from '@api/graphql';
import {
  CommonFindAdministrativeAreaLevel2ByIdQuery,
  CommonUpdateAdministrativeAreaLevel2ByIdCommand,
} from '@app/common/administrative-area-level-2';
import {
  AuditingMeta,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonUpdateAdministrativeAreaLevel2ByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: CommonUpdateAdministrativeAreaLevel2ByIdInput,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAdministrativeAreaLevel2> {
    const administrativeAreaLevel2 = await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel2ByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    if (!administrativeAreaLevel2) {
      throw new NotFoundException(
        `CommonAdministrativeAreaLevel2 with id: ${payload.id}, not found`,
      );
    }

    const dataToUpdate = diff(payload, administrativeAreaLevel2);

    await this.commandBus.dispatch(
      new CommonUpdateAdministrativeAreaLevel2ByIdCommand(
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
      new CommonFindAdministrativeAreaLevel2ByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}

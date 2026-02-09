/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel3,
  CommonUpdateAdministrativeAreaLevel3ByIdInput,
} from '@api/graphql';
import {
  CommonFindAdministrativeAreaLevel3ByIdQuery,
  CommonUpdateAdministrativeAreaLevel3ByIdCommand,
} from '@app/common/administrative-area-level-3';
import {
  AuditingMeta,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonUpdateAdministrativeAreaLevel3ByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: CommonUpdateAdministrativeAreaLevel3ByIdInput,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAdministrativeAreaLevel3> {
    const administrativeAreaLevel3 = await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel3ByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    if (!administrativeAreaLevel3) {
      throw new NotFoundException(
        `CommonAdministrativeAreaLevel3 with id: ${payload.id}, not found`,
      );
    }

    const dataToUpdate = diff(payload, administrativeAreaLevel3);

    await this.commandBus.dispatch(
      new CommonUpdateAdministrativeAreaLevel3ByIdCommand(
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
      new CommonFindAdministrativeAreaLevel3ByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}

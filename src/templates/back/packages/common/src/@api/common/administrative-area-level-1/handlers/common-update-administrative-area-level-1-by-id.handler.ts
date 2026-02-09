/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
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
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonUpdateAdministrativeAreaLevel1ByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: CommonUpdateAdministrativeAreaLevel1ByIdInput,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAdministrativeAreaLevel1> {
    const administrativeAreaLevel1 = await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel1ByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    if (!administrativeAreaLevel1) {
      throw new NotFoundException(
        `CommonAdministrativeAreaLevel1 with id: ${payload.id}, not found`,
      );
    }

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

/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';
import {
  CommonDeleteAdministrativeAreaLevel1ByIdCommand,
  CommonFindAdministrativeAreaLevel1ByIdQuery,
} from '@app/common/administrative-area-level-1';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonDeleteAdministrativeAreaLevel1ByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAdministrativeAreaLevel1> {
    const administrativeAreaLevel1 = await this.queryBus.ask(
      new CommonFindAdministrativeAreaLevel1ByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!administrativeAreaLevel1) {
      throw new NotFoundException(
        `CommonAdministrativeAreaLevel1 with id: ${id}, not found`,
      );
    }

    await this.commandBus.dispatch(
      new CommonDeleteAdministrativeAreaLevel1ByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return administrativeAreaLevel1;
  }
}

/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonResource, CommonUpdateResourceByIdInput } from '@api/graphql';
import {
  CommonFindResourceByIdQuery,
  CommonUpdateResourceByIdCommand,
} from '@app/common/resource';
import {
  AuditingMeta,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonUpdateResourceByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: CommonUpdateResourceByIdInput,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonResource> {
    const resource = await this.queryBus.ask(
      new CommonFindResourceByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    if (!resource) {
      throw new NotFoundException(
        `CommonResource with id: ${payload.id}, not found`,
      );
    }

    const dataToUpdate = diff(payload, resource);

    await this.commandBus.dispatch(
      new CommonUpdateResourceByIdCommand(
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
      new CommonFindResourceByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}

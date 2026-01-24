/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamBoundedContext, IamCreateBoundedContextInput } from '@api/graphql';
import {
  IamCreateBoundedContextCommand,
  IamFindBoundedContextByIdQuery,
} from '@app/iam/bounded-context';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateBoundedContextHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: IamCreateBoundedContextInput,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamBoundedContext> {
    await this.commandBus.dispatch(
      new IamCreateBoundedContextCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new IamFindBoundedContextByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}

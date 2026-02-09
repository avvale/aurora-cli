/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonCreateResourceInput, CommonResource } from '@api/graphql';
import {
  CommonCreateResourceCommand,
  CommonFindResourceByIdQuery,
} from '@app/common/resource';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateResourceHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: CommonCreateResourceInput,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonResource> {
    await this.commandBus.dispatch(
      new CommonCreateResourceCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new CommonFindResourceByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}

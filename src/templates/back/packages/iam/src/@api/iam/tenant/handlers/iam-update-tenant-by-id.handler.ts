import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';
import { IamTenantDto, IamUpdateTenantByIdDto } from '@api/iam/tenant';
import {
  IamFindTenantByIdQuery,
  IamUpdateTenantByIdCommand,
} from '@app/iam/tenant';
import {
  AuditingMeta,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateTenantByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: IamUpdateTenantByIdInput | IamUpdateTenantByIdDto,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamTenant | IamTenantDto> {
    const tenant = await this.queryBus.ask(
      new IamFindTenantByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    const dataToUpdate = diff(payload, tenant);

    await this.commandBus.dispatch(
      new IamUpdateTenantByIdCommand(
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
      new IamFindTenantByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}

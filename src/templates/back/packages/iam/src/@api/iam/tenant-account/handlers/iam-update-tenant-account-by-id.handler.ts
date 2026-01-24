import {
  IamTenantAccount,
  IamUpdateTenantAccountByIdInput,
} from '@api/graphql';
import {
  IamFindTenantAccountByIdQuery,
  IamUpdateTenantAccountByIdCommand,
} from '@app/iam/tenant-account';
import {
  AuditingMeta,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamUpdateTenantAccountByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: IamUpdateTenantAccountByIdInput,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamTenantAccount> {
    const tenantAccount = await this.queryBus.ask(
      new IamFindTenantAccountByIdQuery(
        payload.tenantId,
        payload.accountId,
        constraint,
        {
          timezone,
        },
      ),
    );

    if (!tenantAccount) {
      throw new NotFoundException(
        `IamTenantAccount with tenantId: ${payload.tenantId}, accountId: ${payload.accountId}, not found`,
      );
    }

    const dataToUpdate = diff(payload, tenantAccount);

    await this.commandBus.dispatch(
      new IamUpdateTenantAccountByIdCommand(
        {
          ...dataToUpdate,
          tenantId: payload.tenantId,
          accountId: payload.accountId,
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
      new IamFindTenantAccountByIdQuery(
        payload.tenantId,
        payload.accountId,
        constraint,
        {
          timezone,
        },
      ),
    );
  }
}

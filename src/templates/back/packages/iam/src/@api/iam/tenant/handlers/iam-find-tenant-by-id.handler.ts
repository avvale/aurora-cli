import { IamTenant } from '@api/graphql';
import { IamTenantDto } from '@api/iam/tenant';
import { IamFindTenantByIdQuery } from '@app/iam/tenant';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindTenantByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<IamTenant | IamTenantDto> {
    return await this.queryBus.ask(
      new IamFindTenantByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}

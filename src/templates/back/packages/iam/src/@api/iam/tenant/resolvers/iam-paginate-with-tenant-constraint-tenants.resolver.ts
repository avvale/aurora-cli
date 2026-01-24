import { Pagination } from '@api/graphql';
import { TenantConstraint } from '@api/iam/shared';
import { IamPaginateTenantsHandler } from '@api/iam/tenant';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.get')
export class IamPaginateWithTenantConstraintTenantsResolver {
  constructor(private readonly handler: IamPaginateTenantsHandler) {}

  @Query('iamPaginateWithTenantConstraintTenants')
  @TenantConstraint({
    targetProperty: 'id',
    isArray: false,
  })
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}

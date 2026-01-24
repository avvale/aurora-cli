/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { Pagination } from '@api/graphql';
import { IamPaginatePermissionsRolesQuery } from '@app/iam/permission-role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamPaginatePermissionsRolesHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new IamPaginatePermissionsRolesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}

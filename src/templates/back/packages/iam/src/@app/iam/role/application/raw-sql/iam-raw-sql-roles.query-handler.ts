import { IamRawSQLRolesQuery, IamRoleMapper, IamRoleResponse } from '@app/iam/role';
import { IamRawSQLRolesService } from '@app/iam/role/application/raw-sql/iam-raw-sql-roles.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamRawSQLRolesQuery)
export class IamRawSQLRolesQueryHandler implements IQueryHandler<IamRawSQLRolesQuery>
{
    private readonly mapper: IamRoleMapper = new IamRoleMapper();

    constructor(
        private readonly rawSQLRolesService: IamRawSQLRolesService,
    ) {}

    async execute(query: IamRawSQLRolesQuery): Promise<IamRoleResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLRolesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}

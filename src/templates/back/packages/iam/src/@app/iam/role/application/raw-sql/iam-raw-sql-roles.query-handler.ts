import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamRoleResponse } from '../../domain/iam-role.response';
import { IamRoleMapper } from '../../domain/iam-role.mapper';
import { IamRawSQLRolesQuery } from './iam-raw-sql-roles.query';
import { IamRawSQLRolesService } from './iam-raw-sql-roles.service';

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

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleResponse } from '../../domain/role.response';
import { RoleMapper } from '../../domain/role.mapper';
import { RawSQLRolesQuery } from './raw-sql-roles.query';
import { RawSQLRolesService } from './raw-sql-roles.service';

@QueryHandler(RawSQLRolesQuery)
export class RawSQLRolesQueryHandler implements IQueryHandler<RawSQLRolesQuery>
{
    private readonly mapper: RoleMapper = new RoleMapper();

    constructor(
        private readonly rawSQLRolesService: RawSQLRolesService,
    ) {}

    async execute(query: RawSQLRolesQuery): Promise<RoleResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLRolesService.main(query.rawSQL, query.cQMetadata));
    }
}
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleResponse } from '../../domain/role.response';
import { RoleMapper } from '../../domain/role.mapper';
import { GetRolesQuery } from './get-roles.query';
import { GetRolesService } from './get-roles.service';

@QueryHandler(GetRolesQuery)
export class GetRolesQueryHandler implements IQueryHandler<GetRolesQuery>
{
    private readonly mapper: RoleMapper = new RoleMapper();

    constructor(
        private readonly getRolesService: GetRolesService,
    ) {}

    async execute(query: GetRolesQuery): Promise<RoleResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getRolesService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}
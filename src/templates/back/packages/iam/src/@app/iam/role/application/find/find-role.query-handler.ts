import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleResponse } from '../../domain/role.response';
import { RoleMapper } from '../../domain/role.mapper';
import { FindRoleQuery } from './find-role.query';
import { FindRoleService } from './find-role.service';

@QueryHandler(FindRoleQuery)
export class FindRoleQueryHandler implements IQueryHandler<FindRoleQuery>
{
    private readonly mapper: RoleMapper = new RoleMapper();

    constructor(
        private readonly findRoleService: FindRoleService,
    ) {}

    async execute(query: FindRoleQuery): Promise<RoleResponse>
    {
        const role = await this.findRoleService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(role);
    }
}
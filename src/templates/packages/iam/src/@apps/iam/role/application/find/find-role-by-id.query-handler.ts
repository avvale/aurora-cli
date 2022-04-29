import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleResponse } from '../../domain/role.response';
import { RoleMapper } from '../../domain/role.mapper';
import { RoleId } from '../../domain/value-objects';
import { FindRoleByIdQuery } from './find-role-by-id.query';
import { FindRoleByIdService } from './find-role-by-id.service';

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdQueryHandler implements IQueryHandler<FindRoleByIdQuery>
{
    private readonly mapper: RoleMapper = new RoleMapper();

    constructor(
        private readonly findRoleByIdService: FindRoleByIdService,
    ) {}

    async execute(query: FindRoleByIdQuery): Promise<RoleResponse>
    {
        const role = await this.findRoleByIdService.main(
            new RoleId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(role);
    }
}
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionRoleResponse } from '../../domain/permission-role.response';
import { PermissionRoleMapper } from '../../domain/permission-role.mapper';
import {
    PermissionRolePermissionId,
    PermissionRoleRoleId,
} from '../../domain/value-objects';
import { FindPermissionRoleByIdQuery } from './find-permission-role-by-id.query';
import { FindPermissionRoleByIdService } from './find-permission-role-by-id.service';

@QueryHandler(FindPermissionRoleByIdQuery)
export class FindPermissionRoleByIdQueryHandler implements IQueryHandler<FindPermissionRoleByIdQuery>
{
    private readonly mapper: PermissionRoleMapper = new PermissionRoleMapper();

    constructor(
        private readonly findPermissionByIdService: FindPermissionRoleByIdService,
    ) {}

    async execute(query: FindPermissionRoleByIdQuery): Promise<PermissionRoleResponse>
    {
        const permissionRole = await this.findPermissionByIdService.main(
            new PermissionRolePermissionId(query.permissionId),
            new PermissionRoleRoleId(query.roleId),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(permissionRole);
    }
}
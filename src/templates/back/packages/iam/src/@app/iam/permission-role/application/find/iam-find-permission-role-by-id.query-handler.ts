import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamFindPermissionRoleByIdQuery, IamPermissionRoleResponse, IamPermissionRoleMapper } from '@app/iam/permission-role';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '../../domain/value-objects';
import { IamFindPermissionRoleByIdService } from './iam-find-permission-role-by-id.service';

@QueryHandler(IamFindPermissionRoleByIdQuery)
export class IamFindPermissionRoleByIdQueryHandler implements IQueryHandler<IamFindPermissionRoleByIdQuery>
{
    private readonly mapper: IamPermissionRoleMapper = new IamPermissionRoleMapper();

    constructor(
        private readonly findPermissionByIdService: IamFindPermissionRoleByIdService,
    ) {}

    async execute(query: IamFindPermissionRoleByIdQuery): Promise<IamPermissionRoleResponse>
    {
        const permissionRole = await this.findPermissionByIdService.main(
            new IamPermissionRolePermissionId(query.permissionId),
            new IamPermissionRoleRoleId(query.roleId),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(permissionRole);
    }
}
import { IamPermissionMapper } from '@app/iam/permission';
import {
    IamPermissionRole,
    IamPermissionRoleResponse,
} from '@app/iam/permission-role';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { IamRoleMapper } from '@app/iam/role';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class IamPermissionRoleMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param permissionRole
     */
    mapModelToAggregate(
        permissionRole: LiteralObject,
        cQMetadata?: CQMetadata,
    ): IamPermissionRole {
        if (!permissionRole) return;

        return this.makeAggregate(permissionRole, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param permissionsRoles
     */
    mapModelsToAggregates(
        permissionsRoles: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): IamPermissionRole[] {
        if (!Array.isArray(permissionsRoles)) return;

        return permissionsRoles.map((permissionRole) =>
            this.makeAggregate(permissionRole, cQMetadata),
        );
    }

    /**
     * Map aggregate to response
     * @param permissionRole
     */
    mapAggregateToResponse(
        permissionRole: IamPermissionRole,
    ): IamPermissionRoleResponse {
        return this.makeResponse(permissionRole);
    }

    /**
     * Map array of aggregates to array responses
     * @param permissionsRoles
     */
    mapAggregatesToResponses(
        permissionsRoles: IamPermissionRole[],
    ): IamPermissionRoleResponse[] {
        if (!Array.isArray(permissionsRoles)) return;

        return permissionsRoles.map((permissionRole) =>
            this.makeResponse(permissionRole),
        );
    }

    private makeAggregate(
        permissionRole: LiteralObject,
        cQMetadata?: CQMetadata,
    ): IamPermissionRole {
        return IamPermissionRole.register(
            new IamPermissionRolePermissionId(permissionRole.permissionId, {
                undefinable: true,
            }),
            new IamPermissionRoleRoleId(permissionRole.roleId, {
                undefinable: true,
            }),
            this.options.eagerLoading
                ? new IamPermissionMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(permissionRole.permission, cQMetadata)
                : undefined,
            this.options.eagerLoading
                ? new IamRoleMapper({ eagerLoading: true }).mapModelToAggregate(
                      permissionRole.role,
                      cQMetadata,
                  )
                : undefined,
        );
    }

    private makeResponse(
        permissionRole: IamPermissionRole,
    ): IamPermissionRoleResponse {
        if (!permissionRole) return null;

        return new IamPermissionRoleResponse(
            permissionRole.permissionId.value,
            permissionRole.roleId.value,
            this.options.eagerLoading
                ? new IamPermissionMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(permissionRole.permission)
                : undefined,
            this.options.eagerLoading
                ? new IamRoleMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(permissionRole.role)
                : undefined,
        );
    }
}

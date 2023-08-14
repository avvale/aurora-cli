import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { IamPermission } from './iam-permission.aggregate';
import { IamPermissionResponse } from './iam-permission.response';
import {
    IamPermissionId,
    IamPermissionName,
    IamPermissionBoundedContextId,
    IamPermissionRoleIds,
    IamPermissionCreatedAt,
    IamPermissionUpdatedAt,
    IamPermissionDeletedAt,
} from './value-objects';
import { IamBoundedContextMapper } from '@app/iam/bounded-context';
import { IamRoleMapper } from '@app/iam/role';

export class IamPermissionMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param permission
     */
    mapModelToAggregate(permission: LiteralObject, cQMetadata?: CQMetadata): IamPermission
    {
        if (!permission) return;

        return this.makeAggregate(permission, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param permissions
     */
    mapModelsToAggregates(permissions: LiteralObject[], cQMetadata?: CQMetadata): IamPermission[]
    {
        if (!Array.isArray(permissions)) return;

        return permissions.map(permission => this.makeAggregate(permission, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param permission
     */
    mapAggregateToResponse(permission: IamPermission): IamPermissionResponse
    {
        return this.makeResponse(permission);
    }

    /**
     * Map array of aggregates to array responses
     * @param permissions
     */
    mapAggregatesToResponses(permissions: IamPermission[]): IamPermissionResponse[]
    {
        if (!Array.isArray(permissions)) return;

        return permissions.map(permission => this.makeResponse(permission));
    }

    private makeAggregate(permission: LiteralObject, cQMetadata?: CQMetadata): IamPermission
    {
        return IamPermission.register(
            new IamPermissionId(permission.id, { undefinable: true }),
            new IamPermissionName(permission.name, { undefinable: true }),
            new IamPermissionBoundedContextId(permission.boundedContextId, { undefinable: true }),
            new IamPermissionRoleIds(permission.roleIds, { undefinable: true }),
            new IamPermissionCreatedAt(permission.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new IamPermissionUpdatedAt(permission.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new IamPermissionDeletedAt(permission.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new IamBoundedContextMapper({ eagerLoading: true }).mapModelToAggregate(permission.boundedContext, cQMetadata) : undefined,
            this.options.eagerLoading ? new IamRoleMapper({ eagerLoading: true }).mapModelsToAggregates(permission.roles, cQMetadata) : undefined,
        );
    }

    private makeResponse(permission: IamPermission): IamPermissionResponse
    {
        if (!permission) return;

        return new IamPermissionResponse(
            permission.id.value,
            permission.name.value,
            permission.boundedContextId.value,
            permission.roleIds.value,
            permission.createdAt.value,
            permission.updatedAt.value,
            permission.deletedAt.value,
            this.options.eagerLoading ? new IamBoundedContextMapper({ eagerLoading: true }).mapAggregateToResponse(permission.boundedContext) : undefined,
            this.options.eagerLoading ? new IamRoleMapper({ eagerLoading: true }).mapAggregatesToResponses(permission.roles) : undefined,
        );
    }
}

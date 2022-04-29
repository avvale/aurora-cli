import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from 'aurora-ts-core';
import { IamPermission } from './permission.aggregate';
import { PermissionResponse } from './permission.response';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from './value-objects';
import { BoundedContextMapper } from '../../../../@apps/iam/bounded-context/domain/bounded-context.mapper';
import { RoleMapper } from '../../../../@apps/iam/role/domain/role.mapper';

export class PermissionMapper implements IMapper
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

        return permissions.map(permission  => this.makeAggregate(permission, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param permission
     */
    mapAggregateToResponse(permission: IamPermission): PermissionResponse
    {
        return this.makeResponse(permission);
    }

    /**
     * Map array of aggregates to array responses
     * @param permissions
     */
    mapAggregatesToResponses(permissions: IamPermission[]): PermissionResponse[]
    {
        if (!Array.isArray(permissions)) return;

        return permissions.map(permission => this.makeResponse(permission));
    }

    private makeAggregate(permission: LiteralObject, cQMetadata?: CQMetadata): IamPermission
    {
        return IamPermission.register(
            new PermissionId(permission.id, { undefinable: true }),
            new PermissionName(permission.name, { undefinable: true }),
            new PermissionBoundedContextId(permission.boundedContextId, { undefinable: true }),
            new PermissionRoleIds(permission.roleIds, { undefinable: true }),
            new PermissionCreatedAt(permission.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new PermissionUpdatedAt(permission.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new PermissionDeletedAt(permission.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new BoundedContextMapper({ eagerLoading: true }).mapModelToAggregate(permission.boundedContext) : undefined,
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: true }).mapModelsToAggregates(permission.roles) : undefined,
        );
    }

    private makeResponse(permission: IamPermission): PermissionResponse
    {
        if (!permission) return;

        return new PermissionResponse(
            permission.id.value,
            permission.name.value,
            permission.boundedContextId.value,
            permission.roleIds.value,
            permission.createdAt.value,
            permission.updatedAt.value,
            permission.deletedAt.value,
            this.options.eagerLoading ? new BoundedContextMapper({ eagerLoading: true }).mapAggregateToResponse(permission.boundedContext) : undefined,
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: true }).mapAggregatesToResponses(permission.roles) : undefined,
        );
    }
}
import { IamAccountMapper } from '@app/iam/account';
import { IamPermissionMapper } from '@app/iam/permission';
import { IamRole, IamRoleResponse } from '@app/iam/role';
import {
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleDeletedAt,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
    IamRoleRowId,
    IamRoleUpdatedAt,
} from '@app/iam/role/domain/value-objects';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class IamRoleMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param role
     */
    mapModelToAggregate(role: LiteralObject, cQMetadata?: CQMetadata): IamRole {
        if (!role) return;

        return this.makeAggregate(role, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param roles
     */
    mapModelsToAggregates(
        roles: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): IamRole[] {
        if (!Array.isArray(roles)) return;

        return roles.map((role) => this.makeAggregate(role, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param role
     */
    mapAggregateToResponse(role: IamRole): IamRoleResponse {
        return this.makeResponse(role);
    }

    /**
     * Map array of aggregates to array responses
     * @param roles
     */
    mapAggregatesToResponses(roles: IamRole[]): IamRoleResponse[] {
        if (!Array.isArray(roles)) return;

        return roles.map((role) => this.makeResponse(role));
    }

    private makeAggregate(
        role: LiteralObject,
        cQMetadata?: CQMetadata,
    ): IamRole {
        return IamRole.register(
            new IamRoleId(role.id, { undefinable: true }),
            new IamRoleRowId(role.rowId, { undefinable: true }),
            new IamRoleName(role.name, { undefinable: true }),
            new IamRoleIsMaster(role.isMaster, { undefinable: true }),
            new IamRolePermissionIds(role.permissionIds, { undefinable: true }),
            new IamRoleAccountIds(role.accountIds, { undefinable: true }),
            new IamRoleCreatedAt(
                role.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new IamRoleUpdatedAt(
                role.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new IamRoleDeletedAt(
                role.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            this.options.eagerLoading
                ? new IamPermissionMapper({
                      eagerLoading: true,
                  }).mapModelsToAggregates(role.permissions, cQMetadata)
                : undefined,
            this.options.eagerLoading
                ? new IamAccountMapper({
                      eagerLoading: true,
                  }).mapModelsToAggregates(role.accounts, cQMetadata)
                : undefined,
        );
    }

    private makeResponse(role: IamRole): IamRoleResponse {
        if (!role) return null;

        return new IamRoleResponse(
            role.id.value,
            role.rowId.value,
            role.name.value,
            role.isMaster.value,
            role.permissionIds.value,
            role.accountIds.value,
            role.createdAt.value,
            role.updatedAt.value,
            role.deletedAt.value,
            this.options.eagerLoading
                ? new IamPermissionMapper({
                      eagerLoading: true,
                  }).mapAggregatesToResponses(role.permissions)
                : undefined,
            this.options.eagerLoading
                ? new IamAccountMapper({
                      eagerLoading: true,
                  }).mapAggregatesToResponses(role.accounts)
                : undefined,
        );
    }
}

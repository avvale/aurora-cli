import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from 'aurora-ts-core';
import { IamRole } from './role.aggregate';
import { RoleResponse } from './role.response';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from './value-objects';
import { PermissionMapper } from '../../../../@apps/iam/permission/domain/permission.mapper';
import { AccountMapper } from '../../../../@apps/iam/account/domain/account.mapper';

export class RoleMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param role
     */
    mapModelToAggregate(role: LiteralObject, cQMetadata?: CQMetadata): IamRole
    {
        if (!role) return;

        return this.makeAggregate(role, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param roles
     */
    mapModelsToAggregates(roles: LiteralObject[], cQMetadata?: CQMetadata): IamRole[]
    {
        if (!Array.isArray(roles)) return;

        return roles.map(role  => this.makeAggregate(role, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param role
     */
    mapAggregateToResponse(role: IamRole): RoleResponse
    {
        return this.makeResponse(role);
    }

    /**
     * Map array of aggregates to array responses
     * @param roles
     */
    mapAggregatesToResponses(roles: IamRole[]): RoleResponse[]
    {
        if (!Array.isArray(roles)) return;

        return roles.map(role => this.makeResponse(role));
    }

    private makeAggregate(role: LiteralObject, cQMetadata?: CQMetadata): IamRole
    {
        return IamRole.register(
            new RoleId(role.id, { undefinable: true }),
            new RoleName(role.name, { undefinable: true }),
            new RoleIsMaster(role.isMaster, { undefinable: true }),
            new RolePermissionIds(role.permissionIds, { undefinable: true }),
            new RoleAccountIds(role.accountIds, { undefinable: true }),
            new RoleCreatedAt(role.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new RoleUpdatedAt(role.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new RoleDeletedAt(role.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new PermissionMapper({ eagerLoading: true }).mapModelsToAggregates(role.permissions) : undefined,
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: true }).mapModelsToAggregates(role.accounts) : undefined,
        );
    }

    private makeResponse(role: IamRole): RoleResponse
    {
        if (!role) return;

        return new RoleResponse(
            role.id.value,
            role.name.value,
            role.isMaster.value,
            role.permissionIds.value,
            role.accountIds.value,
            role.createdAt.value,
            role.updatedAt.value,
            role.deletedAt.value,
            this.options.eagerLoading ? new PermissionMapper({ eagerLoading: true }).mapAggregatesToResponses(role.permissions) : undefined,
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: true }).mapAggregatesToResponses(role.accounts) : undefined,
        );
    }
}
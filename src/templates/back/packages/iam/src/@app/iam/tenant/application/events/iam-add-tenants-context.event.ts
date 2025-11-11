import {
    IamCreatedTenantEvent,
    IamCreatedTenantsEvent,
    IamDeletedTenantEvent,
    IamDeletedTenantsEvent,
    IamTenant,
    IamUpdatedTenantEvent,
    IamUpdatedTenantsEvent,
} from '@app/iam/tenant';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddTenantsContextEvent extends AggregateRoot {
    constructor(
        public readonly aggregateRoots: IamTenant[] = [],
        public readonly cQMetadata?: CQMetadata,
    ) {
        super();
    }

    *[Symbol.iterator]() {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void {
        this.apply(
            new IamCreatedTenantsEvent({
                payload: this.aggregateRoots.map(
                    (tenant) =>
                        new IamCreatedTenantEvent({
                            payload: {
                                id: tenant.id.value,
                                parentId: tenant.parentId?.value,
                                name: tenant.name.value,
                                code: tenant.code?.value,
                                logo: tenant.logo?.value,
                                isActive: tenant.isActive.value,
                                meta: tenant.meta?.value,
                                accountIds: tenant.accountIds?.value,
                                createdAt: tenant.createdAt?.value,
                                updatedAt: tenant.updatedAt?.value,
                                deletedAt: tenant.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updated(): void {
        this.apply(
            new IamUpdatedTenantsEvent({
                payload: this.aggregateRoots.map(
                    (tenant) =>
                        new IamUpdatedTenantEvent({
                            payload: {
                                id: tenant.id.value,
                                parentId: tenant.parentId?.value,
                                name: tenant.name.value,
                                code: tenant.code?.value,
                                logo: tenant.logo?.value,
                                isActive: tenant.isActive.value,
                                meta: tenant.meta?.value,
                                accountIds: tenant.accountIds?.value,
                                createdAt: tenant.createdAt?.value,
                                updatedAt: tenant.updatedAt?.value,
                                deletedAt: tenant.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void {
        this.apply(
            new IamDeletedTenantsEvent({
                payload: this.aggregateRoots.map(
                    (tenant) =>
                        new IamDeletedTenantEvent({
                            payload: {
                                id: tenant.id.value,
                                rowId: tenant.rowId.value,
                                parentId: tenant.parentId?.value,
                                name: tenant.name.value,
                                code: tenant.code?.value,
                                logo: tenant.logo?.value,
                                isActive: tenant.isActive.value,
                                meta: tenant.meta?.value,
                                accountIds: tenant.accountIds?.value,
                                createdAt: tenant.createdAt?.value,
                                updatedAt: tenant.updatedAt?.value,
                                deletedAt: tenant.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}

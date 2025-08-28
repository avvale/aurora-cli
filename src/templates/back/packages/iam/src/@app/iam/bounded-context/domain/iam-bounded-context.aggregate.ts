/* eslint-disable key-spacing */
import { IamCreatedBoundedContextEvent, IamDeletedBoundedContextEvent, IamUpdatedBoundedContextEvent } from '@app/iam/bounded-context';
import {
    IamBoundedContextCreatedAt,
    IamBoundedContextDeletedAt,
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextUpdatedAt,
} from '@app/iam/bounded-context/domain/value-objects';
import { IamPermission } from '@app/iam/permission';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamBoundedContext extends AggregateRoot
{
    id: IamBoundedContextId;
    name: IamBoundedContextName;
    root: IamBoundedContextRoot;
    sort: IamBoundedContextSort;
    isActive: IamBoundedContextIsActive;
    createdAt: IamBoundedContextCreatedAt;
    updatedAt: IamBoundedContextUpdatedAt;
    deletedAt: IamBoundedContextDeletedAt;
    permissions: IamPermission[];

    constructor(
        id: IamBoundedContextId,
        name: IamBoundedContextName,
        root: IamBoundedContextRoot,
        sort: IamBoundedContextSort,
        isActive: IamBoundedContextIsActive,
        createdAt: IamBoundedContextCreatedAt,
        updatedAt: IamBoundedContextUpdatedAt,
        deletedAt: IamBoundedContextDeletedAt,
        permissions?: IamPermission[],
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.root = root;
        this.sort = sort;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.permissions = permissions;
    }

    static register(
        id: IamBoundedContextId,
        name: IamBoundedContextName,
        root: IamBoundedContextRoot,
        sort: IamBoundedContextSort,
        isActive: IamBoundedContextIsActive,
        createdAt: IamBoundedContextCreatedAt,
        updatedAt: IamBoundedContextUpdatedAt,
        deletedAt: IamBoundedContextDeletedAt,
        permissions?: IamPermission[],
    ): IamBoundedContext
    {
        return new IamBoundedContext(
            id,
            name,
            root,
            sort,
            isActive,
            createdAt,
            updatedAt,
            deletedAt,
            permissions,
        );
    }

    created(
        event: {
            payload: IamBoundedContext;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new IamCreatedBoundedContextEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    root: event.payload.root.value,
                    sort: event.payload.sort?.value,
                    isActive: event.payload.isActive.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(
        event: {
            payload: IamBoundedContext;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new IamUpdatedBoundedContextEvent({
                payload: {
                    id: event.payload.id?.value,
                    name: event.payload.name?.value,
                    root: event.payload.root?.value,
                    sort: event.payload.sort?.value,
                    isActive: event.payload.isActive?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(
        event: {
            payload: IamBoundedContext;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new IamDeletedBoundedContextEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    root: event.payload.root.value,
                    sort: event.payload.sort?.value,
                    isActive: event.payload.isActive.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            root: this.root.value,
            sort: this.sort?.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            permissions: this.permissions?.map(item => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            root: this.root.value,
            sort: this.sort?.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            permissions: this.permissions?.map(item => item.toDTO()),
        };
    }
}

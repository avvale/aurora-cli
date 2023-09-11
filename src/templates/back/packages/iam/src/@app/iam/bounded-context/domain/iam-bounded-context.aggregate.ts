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
import { LiteralObject, Utils } from '@aurorajs.dev/core';
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

    created(boundedContext: IamBoundedContext): void
    {
        this.apply(
            new IamCreatedBoundedContextEvent(
                boundedContext.id.value,
                boundedContext.name.value,
                boundedContext.root.value,
                boundedContext.sort?.value,
                boundedContext.isActive.value,
                boundedContext.createdAt?.value,
                boundedContext.updatedAt?.value,
                boundedContext.deletedAt?.value,
            ),
        );
    }

    updated(boundedContext: IamBoundedContext): void
    {
        this.apply(
            new IamUpdatedBoundedContextEvent(
                boundedContext.id?.value,
                boundedContext.name?.value,
                boundedContext.root?.value,
                boundedContext.sort?.value,
                boundedContext.isActive?.value,
                boundedContext.createdAt?.value,
                boundedContext.updatedAt?.value,
                boundedContext.deletedAt?.value,
            ),
        );
    }

    deleted(boundedContext: IamBoundedContext): void
    {
        this.apply(
            new IamDeletedBoundedContextEvent(
                boundedContext.id.value,
                boundedContext.name.value,
                boundedContext.root.value,
                boundedContext.sort?.value,
                boundedContext.isActive.value,
                boundedContext.createdAt?.value,
                boundedContext.updatedAt?.value,
                boundedContext.deletedAt?.value,
            ),
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

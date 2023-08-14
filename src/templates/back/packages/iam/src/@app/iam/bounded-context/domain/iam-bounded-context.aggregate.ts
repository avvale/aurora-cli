/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    IamBoundedContextId,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextIsActive,
    IamBoundedContextCreatedAt,
    IamBoundedContextUpdatedAt,
    IamBoundedContextDeletedAt,
} from './value-objects';
import { IamCreatedBoundedContextEvent } from '../application/events/iam-created-bounded-context.event';
import { IamUpdatedBoundedContextEvent } from '../application/events/iam-updated-bounded-context.event';
import { IamDeletedBoundedContextEvent } from '../application/events/iam-deleted-bounded-context.event';
import { IamPermission } from '@app/iam/permission';

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

    // eager relationship
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

        // eager relationship
        this.permissions = permissions;
    }

    static register (
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

            // eager relationship
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

            // eager relationship
            permissions: this.permissions?.map(item => item.toDTO()),
        };
    }
}

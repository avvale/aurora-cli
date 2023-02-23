import { AggregateRoot } from '@nestjs/cqrs';
import { IamUser } from '../../domain/user.aggregate';
import { CreatedUserEvent } from './created-user.event';
import { CreatedUsersEvent } from './created-users.event';
import { UpdatedUserEvent } from './updated-user.event';
import { UpdatedUsersEvent } from './updated-users.event';
import { DeletedUserEvent } from './deleted-user.event';
import { DeletedUsersEvent } from './deleted-users.event';

export class AddUsersContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamUser[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new CreatedUsersEvent(
                this.aggregateRoots.map(user =>
                    new CreatedUserEvent(
                        user.id.value,
                        user.accountId.value,
                        user.name.value,
                        user.surname?.value,
                        user.avatar?.value,
                        user.mobile?.value,
                        user.langId?.value,
                        user.username.value,
                        user.password.value,
                        user.rememberToken?.value,
                        user.meta?.value,
                        user.createdAt?.value,
                        user.updatedAt?.value,
                        user.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new UpdatedUsersEvent(
                this.aggregateRoots.map(user =>
                    new UpdatedUserEvent(
                        user.id.value,
                        user.accountId.value,
                        user.name.value,
                        user.surname?.value,
                        user.avatar?.value,
                        user.mobile?.value,
                        user.langId?.value,
                        user.username.value,
                        user.password.value,
                        user.rememberToken?.value,
                        user.meta?.value,
                        user.createdAt?.value,
                        user.updatedAt?.value,
                        user.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new DeletedUsersEvent(
                this.aggregateRoots.map(user =>
                    new DeletedUserEvent(
                        user.id.value,
                        user.accountId.value,
                        user.name.value,
                        user.surname?.value,
                        user.avatar?.value,
                        user.mobile?.value,
                        user.langId?.value,
                        user.username.value,
                        user.password.value,
                        user.rememberToken?.value,
                        user.meta?.value,
                        user.createdAt?.value,
                        user.updatedAt?.value,
                        user.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
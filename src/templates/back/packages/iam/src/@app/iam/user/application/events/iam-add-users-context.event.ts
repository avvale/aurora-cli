import { IamCreatedUserEvent, IamCreatedUsersEvent, IamDeletedUserEvent, IamDeletedUsersEvent, IamUpdatedUserEvent, IamUpdatedUsersEvent, IamUser } from '@app/iam/user';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddUsersContextEvent extends AggregateRoot
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
            new IamCreatedUsersEvent(
                this.aggregateRoots.map(user =>
                    new IamCreatedUserEvent(
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
            new IamUpdatedUsersEvent(
                this.aggregateRoots.map(user =>
                    new IamUpdatedUserEvent(
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
            new IamDeletedUsersEvent(
                this.aggregateRoots.map(user =>
                    new IamDeletedUserEvent(
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

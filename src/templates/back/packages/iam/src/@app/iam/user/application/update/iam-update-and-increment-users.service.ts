import { IamAddUsersContextEvent, IamIUserRepository, IamUser } from '@app/iam/user';
import {
    IamUserAccountId,
    IamUserAvatar,
    IamUserCreatedAt,
    IamUserDeletedAt,
    IamUserId,
    IamUserLangId,
    IamUserMeta,
    IamUserMobile,
    IamUserName,
    IamUserPassword,
    IamUserRememberToken,
    IamUserSurname,
    IamUserUpdatedAt,
    IamUserUsername,
} from '@app/iam/user/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateAndIncrementUsersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIUserRepository,
    ) {}

    async main(
        payload: {
            id?: IamUserId;
            accountId?: IamUserAccountId;
            name?: IamUserName;
            surname?: IamUserSurname;
            avatar?: IamUserAvatar;
            mobile?: IamUserMobile;
            langId?: IamUserLangId;
            username?: IamUserUsername;
            password?: IamUserPassword;
            rememberToken?: IamUserRememberToken;
            meta?: IamUserMeta;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const user = IamUser.register(
            payload.id,
            payload.accountId,
            payload.name,
            payload.surname,
            payload.avatar,
            payload.mobile,
            payload.langId,
            payload.username,
            payload.password,
            payload.rememberToken,
            payload.meta,
            null, // createdAt
            new IamUserUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update and increment
        await this.repository.updateAndIncrement(
            user,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const users = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const usersRegister = this.publisher.mergeObjectContext(
            new IamAddUsersContextEvent(users),
        );

        usersRegister.updatedAndIncremented(); // apply event to model events
        usersRegister.commit(); // commit all events of model
    }
}

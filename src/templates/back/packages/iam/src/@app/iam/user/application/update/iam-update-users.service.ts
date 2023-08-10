import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    IamUserId,
    IamUserAccountId,
    IamUserName,
    IamUserSurname,
    IamUserAvatar,
    IamUserMobile,
    IamUserLangId,
    IamUserUsername,
    IamUserPassword,
    IamUserRememberToken,
    IamUserMeta,
    IamUserCreatedAt,
    IamUserUpdatedAt,
    IamUserDeletedAt,
} from '../../domain/value-objects';
import { IamIUserRepository } from '../../domain/iam-user.repository';
import { IamUser } from '../../domain/iam-user.aggregate';
import { IamAddUsersContextEvent } from '../events/iam-add-users-context.event';

@Injectable()
export class IamUpdateUsersService
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


        // update
        await this.repository.update(
            user,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
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

        usersRegister.updated(); // apply event to model events
        usersRegister.commit(); // commit all events of model
    }
}

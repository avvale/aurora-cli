import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from 'aurora-ts-core';
import {
    UserId,
    UserAccountId,
    UserName,
    UserSurname,
    UserAvatar,
    UserMobile,
    UserLangId,
    UserUsername,
    UserPassword,
    UserRememberToken,
    UserData,
    UserCreatedAt,
    UserUpdatedAt,
    UserDeletedAt,
} from '../../domain/value-objects';
import { IUserRepository } from '../../domain/user.repository';
import { IamUser } from '../../domain/user.aggregate';
import { AddUsersContextEvent } from '../events/add-users-context.event';

@Injectable()
export class CreateUsersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IUserRepository,
    ) {}

    async main(
        users: {
            id: UserId;
            accountId: UserAccountId;
            name: UserName;
            surname: UserSurname;
            avatar: UserAvatar;
            mobile: UserMobile;
            langId: UserLangId;
            username: UserUsername;
            password: UserPassword;
            rememberToken: UserRememberToken;
            data: UserData;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateUsers = users.map(user => IamUser.register(
            user.id,
            user.accountId,
            user.name,
            user.surname,
            user.avatar,
            user.mobile,
            user.langId,
            user.username,
            user.password,
            user.rememberToken,
            user.data,
            new UserCreatedAt({ currentTimestamp: true }),
            new UserUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateUsers, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddUsersContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const usersRegistered = this.publisher.mergeObjectContext(new AddUsersContextEvent(aggregateUsers));

        usersRegistered.created(); // apply event to model events
        usersRegistered.commit(); // commit all events of model
    }
}
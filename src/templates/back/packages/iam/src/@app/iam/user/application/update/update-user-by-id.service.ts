import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
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
    UserMeta,
    UserCreatedAt,
    UserUpdatedAt,
    UserDeletedAt,
} from '../../domain/value-objects';
import { IUserRepository } from '../../domain/user.repository';
import { IamUser } from '../../domain/user.aggregate';

@Injectable()
export class UpdateUserByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IUserRepository,
    ) {}

    async main(
        payload: {
            id: UserId;
            accountId?: UserAccountId;
            name?: UserName;
            surname?: UserSurname;
            avatar?: UserAvatar;
            mobile?: UserMobile;
            langId?: UserLangId;
            username?: UserUsername;
            password?: UserPassword;
            rememberToken?: UserRememberToken;
            meta?: UserMeta;
        },
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
            new UserUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update by id
        await this.repository.updateById(user, { constraint, cQMetadata, updateByIdOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const userRegister = this.publisher.mergeObjectContext(
            user,
        );

        userRegister.updated(user); // apply event to model events
        userRegister.commit(); // commit all events of model
    }
}
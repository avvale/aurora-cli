import { IamAddUsersContextEvent, IamIUserRepository, IamUser } from '@app/iam/user';
import {
    IamUserAccountId,
    IamUserAvatar,
    IamUserCreatedAt,
    IamUserDeletedAt,
    IamUserId,
    IamUserIsTwoFactorAuthenticationEnabled,
    IamUserLangId,
    IamUserMeta,
    IamUserMobile,
    IamUserName,
    IamUserPassword,
    IamUserRememberToken,
    IamUserSurname,
    IamUserTwoFactorAuthenticationSecret,
    IamUserUpdatedAt,
} from '@app/iam/user/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateUsersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIUserRepository,
    ) {}

    async main(
        payload: {
            id: IamUserId;
            accountId: IamUserAccountId;
            name: IamUserName;
            surname: IamUserSurname;
            avatar: IamUserAvatar;
            mobile: IamUserMobile;
            langId: IamUserLangId;
            password: IamUserPassword;
            isTwoFactorAuthenticationEnabled: IamUserIsTwoFactorAuthenticationEnabled;
            twoFactorAuthenticationSecret: IamUserTwoFactorAuthenticationSecret;
            rememberToken: IamUserRememberToken;
            meta: IamUserMeta;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateUsers = payload.map(user => IamUser.register(
            user.id,
            user.accountId,
            user.name,
            user.surname,
            user.avatar,
            user.mobile,
            user.langId,
            user.password,
            user.isTwoFactorAuthenticationEnabled,
            user.twoFactorAuthenticationSecret,
            user.rememberToken,
            user.meta,
            new IamUserCreatedAt({ currentTimestamp: true }),
            new IamUserUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateUsers,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddUsersContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const usersRegistered = this.publisher.mergeObjectContext(new IamAddUsersContextEvent(aggregateUsers));

        usersRegistered.created(); // apply event to model events
        usersRegistered.commit(); // commit all events of model
    }
}

import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from 'aurora-ts-core';
import { IamUser } from './user.aggregate';
import { UserResponse } from './user.response';
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
} from './value-objects';
import { AccountMapper } from '../../../../@apps/iam/account/domain/account.mapper';

export class UserMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param user
     */
    mapModelToAggregate(user: LiteralObject, cQMetadata?: CQMetadata): IamUser
    {
        if (!user) return;

        return this.makeAggregate(user, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param users
     */
    mapModelsToAggregates(users: LiteralObject[], cQMetadata?: CQMetadata): IamUser[]
    {
        if (!Array.isArray(users)) return;

        return users.map(user  => this.makeAggregate(user, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param user
     */
    mapAggregateToResponse(user: IamUser): UserResponse
    {
        return this.makeResponse(user);
    }

    /**
     * Map array of aggregates to array responses
     * @param users
     */
    mapAggregatesToResponses(users: IamUser[]): UserResponse[]
    {
        if (!Array.isArray(users)) return;

        return users.map(user => this.makeResponse(user));
    }

    private makeAggregate(user: LiteralObject, cQMetadata?: CQMetadata): IamUser
    {
        return IamUser.register(
            new UserId(user.id, { undefinable: true }),
            new UserAccountId(user.accountId, { undefinable: true }),
            new UserName(user.name, { undefinable: true }),
            new UserSurname(user.surname, { undefinable: true }),
            new UserAvatar(user.avatar, { undefinable: true }),
            new UserMobile(user.mobile, { undefinable: true }),
            new UserLangId(user.langId, { undefinable: true }),
            new UserUsername(user.username, { undefinable: true }),
            new UserPassword(user.password, { undefinable: true }),
            new UserRememberToken(user.rememberToken, { undefinable: true }),
            new UserData(user.data, { undefinable: true }),
            new UserCreatedAt(user.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new UserUpdatedAt(user.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new UserDeletedAt(user.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: true }).mapModelToAggregate(user.account) : undefined,
        );
    }

    private makeResponse(user: IamUser): UserResponse
    {
        if (!user) return;

        return new UserResponse(
            user.id.value,
            user.accountId.value,
            user.name.value,
            user.surname.value,
            user.avatar.value,
            user.mobile.value,
            user.langId.value,
            user.username.value,
            user.password.value,
            user.rememberToken.value,
            user.data.value,
            user.createdAt.value,
            user.updatedAt.value,
            user.deletedAt.value,
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: true }).mapAggregateToResponse(user.account) : undefined,
        );
    }
}
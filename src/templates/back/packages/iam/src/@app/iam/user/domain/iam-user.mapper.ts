import { IamAccountMapper } from '@app/iam/account';
import { IamUser, IamUserResponse } from '@app/iam/user';
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
    IamUserRowId,
    IamUserSurname,
    IamUserTwoFactorAuthenticationSecret,
    IamUserUpdatedAt,
} from '@app/iam/user/domain/value-objects';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class IamUserMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param user
     */
    mapModelToAggregate(user: LiteralObject, cQMetadata?: CQMetadata): IamUser {
        if (!user) return;

        return this.makeAggregate(user, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param users
     */
    mapModelsToAggregates(
        users: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): IamUser[] {
        if (!Array.isArray(users)) return;

        return users.map((user) => this.makeAggregate(user, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param user
     */
    mapAggregateToResponse(user: IamUser): IamUserResponse {
        return this.makeResponse(user);
    }

    /**
     * Map array of aggregates to array responses
     * @param users
     */
    mapAggregatesToResponses(users: IamUser[]): IamUserResponse[] {
        if (!Array.isArray(users)) return;

        return users.map((user) => this.makeResponse(user));
    }

    private makeAggregate(
        user: LiteralObject,
        cQMetadata?: CQMetadata,
    ): IamUser {
        return IamUser.register(
            new IamUserId(user.id, { undefinable: true }),
            new IamUserRowId(user.rowId, { undefinable: true }),
            new IamUserAccountId(user.accountId, { undefinable: true }),
            new IamUserName(user.name, { undefinable: true }),
            new IamUserSurname(user.surname, { undefinable: true }),
            new IamUserAvatar(user.avatar, { undefinable: true }),
            new IamUserMobile(user.mobile, { undefinable: true }),
            new IamUserLangId(user.langId, { undefinable: true }),
            new IamUserPassword(user.password, { undefinable: true }),
            new IamUserIsTwoFactorAuthenticationEnabled(
                user.isTwoFactorAuthenticationEnabled,
                { undefinable: true },
            ),
            new IamUserTwoFactorAuthenticationSecret(
                user.twoFactorAuthenticationSecret,
                { undefinable: true },
            ),
            new IamUserRememberToken(user.rememberToken, { undefinable: true }),
            new IamUserMeta(user.meta, { undefinable: true }),
            new IamUserCreatedAt(
                user.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new IamUserUpdatedAt(
                user.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new IamUserDeletedAt(
                user.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            this.options.eagerLoading
                ? new IamAccountMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(user.account, cQMetadata)
                : undefined,
        );
    }

    private makeResponse(user: IamUser): IamUserResponse {
        if (!user) return null;

        return new IamUserResponse(
            user.id.value,
            user.rowId.value,
            user.accountId.value,
            user.name.value,
            user.surname.value,
            user.avatar.value,
            user.mobile.value,
            user.langId.value,
            user.password.value,
            user.isTwoFactorAuthenticationEnabled.value,
            user.twoFactorAuthenticationSecret.value,
            user.rememberToken.value,
            user.meta.value,
            user.createdAt.value,
            user.updatedAt.value,
            user.deletedAt.value,
            this.options.eagerLoading
                ? new IamAccountMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(user.account)
                : undefined,
        );
    }
}

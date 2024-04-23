/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIUserRepository, iamMockUserData, IamMockUserRepository } from '@app/iam/user';
import { IamUpdateAndIncrementUsersService } from '@app/iam/user/application/update/iam-update-and-increment-users.service';
import {
    IamUserAccountId,
    IamUserAvatar,
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
} from '@app/iam/user/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementUsersService', () =>
{
    let service: IamUpdateAndIncrementUsersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateAndIncrementUsersService,
                IamMockUserRepository,
                {
                    provide : IamIUserRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateAndIncrementUsersService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementUsersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a users and emit event', async () =>
        {
            /* eslint-disable key-spacing */
            expect(
                await service.main(
                    {
                        id: new IamUserId(iamMockUserData[0].id),
                        accountId: new IamUserAccountId(iamMockUserData[0].accountId),
                        name: new IamUserName(iamMockUserData[0].name),
                        surname: new IamUserSurname(iamMockUserData[0].surname),
                        avatar: new IamUserAvatar(iamMockUserData[0].avatar),
                        mobile: new IamUserMobile(iamMockUserData[0].mobile),
                        langId: new IamUserLangId(iamMockUserData[0].langId),
                        password: new IamUserPassword(iamMockUserData[0].password),
                        isTwoFactorAuthenticationEnabled: new IamUserIsTwoFactorAuthenticationEnabled(iamMockUserData[0].isTwoFactorAuthenticationEnabled),
                        twoFactorAuthenticationSecret: new IamUserTwoFactorAuthenticationSecret(iamMockUserData[0].twoFactorAuthenticationSecret),
                        rememberToken: new IamUserRememberToken(iamMockUserData[0].rememberToken),
                        meta: new IamUserMeta(iamMockUserData[0].meta),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});

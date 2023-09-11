/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIUserRepository, iamMockUserData, IamMockUserRepository } from '@app/iam/user';
import { IamCreateUserService } from '@app/iam/user/application/create/iam-create-user.service';
import {
    IamUserAccountId,
    IamUserAvatar,
    IamUserId,
    IamUserLangId,
    IamUserMeta,
    IamUserMobile,
    IamUserName,
    IamUserPassword,
    IamUserRememberToken,
    IamUserSurname,
    IamUserUsername,
} from '@app/iam/user/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateUserService', () =>

{
    let service: IamCreateUserService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateUserService,
                IamMockUserRepository,
                {
                    provide : IamIUserRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCreateUserService);
    });

    describe('main', () =>
    {
        test('IamCreateUserService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a user and emit event', async () =>
        {
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
                        username: new IamUserUsername(iamMockUserData[0].username),
                        password: new IamUserPassword(iamMockUserData[0].password),
                        rememberToken: new IamUserRememberToken(iamMockUserData[0].rememberToken),
                        meta: new IamUserMeta(iamMockUserData[0].meta),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});

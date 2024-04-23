import { iamMockUserData, IamUpsertUserCommand } from '@app/iam/user';
import { IamUpsertUserCommandHandler } from '@app/iam/user/application/upsert/iam-upsert-user.command-handler';
import { IamUpsertUserService } from '@app/iam/user/application/upsert/iam-upsert-user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertUserCommandHandler', () =>
{
    let commandHandler: IamUpsertUserCommandHandler;
    let service: IamUpsertUserService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertUserCommandHandler,
                {
                    provide : IamUpsertUserService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertUserCommandHandler>(IamUpsertUserCommandHandler);
        service = module.get<IamUpsertUserService>(IamUpsertUserService);
    });

    describe('main', () =>
    {
        test('UpsertUserCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertUserService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertUserCommand(
                    {
                        id: iamMockUserData[0].id,
                        accountId: iamMockUserData[0].accountId,
                        name: iamMockUserData[0].name,
                        surname: iamMockUserData[0].surname,
                        avatar: iamMockUserData[0].avatar,
                        mobile: iamMockUserData[0].mobile,
                        langId: iamMockUserData[0].langId,
                        password: iamMockUserData[0].password,
                        isTwoFactorAuthenticationEnabled: iamMockUserData[0].isTwoFactorAuthenticationEnabled,
                        twoFactorAuthenticationSecret: iamMockUserData[0].twoFactorAuthenticationSecret,
                        rememberToken: iamMockUserData[0].rememberToken,
                        meta: iamMockUserData[0].meta,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

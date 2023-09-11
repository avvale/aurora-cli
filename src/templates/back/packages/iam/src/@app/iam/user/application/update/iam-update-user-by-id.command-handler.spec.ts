import { iamMockUserData, IamUpdateUserByIdCommand } from '@app/iam/user';
import { IamUpdateUserByIdCommandHandler } from '@app/iam/user/application/update/iam-update-user-by-id.command-handler';
import { IamUpdateUserByIdService } from '@app/iam/user/application/update/iam-update-user-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateUserByIdCommandHandler', () =>
{
    let commandHandler: IamUpdateUserByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateUserByIdCommandHandler,
                {
                    provide : IamUpdateUserByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateUserByIdCommandHandler>(IamUpdateUserByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateUserByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an user created', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateUserByIdCommand(
                    {
                        id: iamMockUserData[0].id,
                        accountId: iamMockUserData[0].accountId,
                        name: iamMockUserData[0].name,
                        surname: iamMockUserData[0].surname,
                        avatar: iamMockUserData[0].avatar,
                        mobile: iamMockUserData[0].mobile,
                        langId: iamMockUserData[0].langId,
                        username: iamMockUserData[0].username,
                        password: iamMockUserData[0].password,
                        rememberToken: iamMockUserData[0].rememberToken,
                        meta: iamMockUserData[0].meta,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

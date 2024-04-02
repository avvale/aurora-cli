import { iamMockUserData, IamUpdateAndIncrementUsersCommand } from '@app/iam/user';
import { IamUpdateAndIncrementUsersCommandHandler } from '@app/iam/user/application/update/iam-update-and-increment-users.command-handler';
import { IamUpdateAndIncrementUsersService } from '@app/iam/user/application/update/iam-update-and-increment-users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementUsersCommandHandler', () =>
{
    let commandHandler: IamUpdateAndIncrementUsersCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAndIncrementUsersCommandHandler,
                {
                    provide : IamUpdateAndIncrementUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAndIncrementUsersCommandHandler>(IamUpdateAndIncrementUsersCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementUsersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an users updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new IamUpdateAndIncrementUsersCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockUserData } from '@app/iam/user/infrastructure/mock/iam-mock-user.data';
import { IamUpdateUsersCommandHandler } from './iam-update-users.command-handler';
import { IamUpdateUsersCommand } from './iam-update-users.command';
import { IamUpdateUsersService } from './iam-update-users.service';

describe('IamUpdateUsersCommandHandler', () =>
{
    let commandHandler: IamUpdateUsersCommandHandler;
    let service: IamUpdateUsersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateUsersCommandHandler,
                {
                    provide : IamUpdateUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateUsersCommandHandler>(IamUpdateUsersCommandHandler);
        service = module.get<IamUpdateUsersService>(IamUpdateUsersService);
    });

    describe('main', () =>
    {
        test('UpdateUsersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an users updated', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateUsersCommand(
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
        });
    });
});

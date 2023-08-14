import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockUserData } from '@app/iam/user/infrastructure/mock/iam-mock-user.data';
import { IamUpdateUserByIdCommandHandler } from './iam-update-user-by-id.command-handler';
import { IamUpdateUserByIdCommand } from './iam-update-user-by-id.command';
import { IamUpdateUserByIdService } from './iam-update-user-by-id.service';

describe('IamUpdateUserByIdCommandHandler', () =>
{
    let commandHandler: IamUpdateUserByIdCommandHandler;
    let service: IamUpdateUserByIdService;

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
        service = module.get<IamUpdateUserByIdService>(IamUpdateUserByIdService);
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

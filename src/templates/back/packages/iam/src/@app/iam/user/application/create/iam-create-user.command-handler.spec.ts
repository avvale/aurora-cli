import { IamCreateUserCommandHandler } from './iam-create-user.command-handler';
import { IamCreateUserService } from './iam-create-user.service';
import { IamCreateUserCommand, iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateUserCommandHandler', () =>
{
    let commandHandler: IamCreateUserCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateUserCommandHandler,
                {
                    provide : IamCreateUserService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateUserCommandHandler>(IamCreateUserCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateUserCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the IamCreateUserService', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateUserCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

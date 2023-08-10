import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockUserData } from '@app/iam/user/infrastructure/mock/iam-mock-user.data';
import { IamUpsertUserCommandHandler } from './iam-upsert-user.command-handler';
import { IamUpsertUserCommand } from './iam-upsert-user.command';
import { IamUpsertUserService } from './iam-upsert-user.service';

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

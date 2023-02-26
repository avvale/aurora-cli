import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';
import { UpsertUserCommandHandler } from './upsert-user.command-handler';
import { UpsertUserCommand } from './upsert-user.command';
import { UpsertUserService } from './upsert-user.service';

describe('UpsertUserCommandHandler', () =>
{
    let commandHandler: UpsertUserCommandHandler;
    let service: UpsertUserService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertUserCommandHandler,
                {
                    provide : UpsertUserService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertUserCommandHandler>(UpsertUserCommandHandler);
        service         = module.get<UpsertUserService>(UpsertUserService);
    });

    describe('main', () =>
    {
        test('UpsertUserCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertUserService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertUserCommand(
                    {
                        id: users[0].id,
                        accountId: users[0].accountId,
                        name: users[0].name,
                        surname: users[0].surname,
                        avatar: users[0].avatar,
                        mobile: users[0].mobile,
                        langId: users[0].langId,
                        username: users[0].username,
                        password: users[0].password,
                        rememberToken: users[0].rememberToken,
                        meta: users[0].meta,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
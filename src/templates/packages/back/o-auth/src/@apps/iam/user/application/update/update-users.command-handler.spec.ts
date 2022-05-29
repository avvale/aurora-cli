import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';
import { UpdateUsersCommandHandler } from './update-users.command-handler';
import { UpdateUsersCommand } from './update-users.command';
import { UpdateUsersService } from './update-users.service';

describe('UpdateUsersCommandHandler', () =>
{
    let commandHandler: UpdateUsersCommandHandler;
    let service: UpdateUsersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateUsersCommandHandler,
                {
                    provide : UpdateUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateUsersCommandHandler>(UpdateUsersCommandHandler);
        service         = module.get<UpdateUsersService>(UpdateUsersService);
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
                new UpdateUsersCommand(
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
                        data: users[0].data,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
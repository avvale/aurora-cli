import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { users } from '../../../../../@apps/iam/user/infrastructure/seeds/user.seed';
import { UpdateUserCommandHandler } from './update-user.command-handler';
import { UpdateUserCommand } from './update-user.command';
import { UpdateUserService } from './update-user.service';

describe('UpdateUserCommandHandler', () =>
{
    let commandHandler: UpdateUserCommandHandler;
    let service: UpdateUserService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateUserCommandHandler,
                {
                    provide : UpdateUserService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<UpdateUserCommandHandler>(UpdateUserCommandHandler);
        service         = module.get<UpdateUserService>(UpdateUserService);
    });

    describe('main', () =>
    {
        test('UpdateUserCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an user created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateUserCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
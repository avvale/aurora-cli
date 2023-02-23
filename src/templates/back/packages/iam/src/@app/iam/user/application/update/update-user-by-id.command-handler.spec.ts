import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';
import { UpdateUserByIdCommandHandler } from './update-user-by-id.command-handler';
import { UpdateUserByIdCommand } from './update-user-by-id.command';
import { UpdateUserByIdService } from './update-user-by-id.service';

describe('UpdateUserByIdCommandHandler', () =>
{
    let commandHandler: UpdateUserByIdCommandHandler;
    let service: UpdateUserByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateUserByIdCommandHandler,
                {
                    provide : UpdateUserByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateUserByIdCommandHandler>(UpdateUserByIdCommandHandler);
        service         = module.get<UpdateUserByIdService>(UpdateUserByIdService);
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
                new UpdateUserByIdCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
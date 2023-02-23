import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';
import { CreateUserCommandHandler } from './create-user.command-handler';
import { CreateUserCommand } from './create-user.command';
import { CreateUserService } from './create-user.service';

describe('CreateUserCommandHandler', () =>
{
    let commandHandler: CreateUserCommandHandler;
    let service: CreateUserService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserCommandHandler,
                {
                    provide : CreateUserService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateUserCommandHandler>(CreateUserCommandHandler);
        service         = module.get<CreateUserService>(CreateUserService);
    });

    describe('main', () =>
    {
        test('CreateUserCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateUserService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateUserCommand(
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
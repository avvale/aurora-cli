import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteUsersCommandHandler } from './iam-delete-users.command-handler';
import { IamDeleteUsersCommand } from './iam-delete-users.command';
import { IamDeleteUsersService } from './iam-delete-users.service';

describe('IamDeleteUsersCommandHandler', () =>
{
    let commandHandler: IamDeleteUsersCommandHandler;
    let service: IamDeleteUsersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteUsersCommandHandler,
                {
                    provide : IamDeleteUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteUsersCommandHandler>(IamDeleteUsersCommandHandler);
        service = module.get<IamDeleteUsersService>(IamDeleteUsersService);
    });

    describe('main', () =>
    {
        test('IamDeleteUsersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteUsersCommand(),
            )).toBe(undefined);
        });
    });
});

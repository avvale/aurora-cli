import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteUsersCommandHandler } from './delete-users.command-handler';
import { DeleteUsersCommand } from './delete-users.command';
import { DeleteUsersService } from './delete-users.service';

describe('DeleteUsersCommandHandler', () =>
{
    let commandHandler: DeleteUsersCommandHandler;
    let service: DeleteUsersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteUsersCommandHandler,
                {
                    provide: DeleteUsersService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteUsersCommandHandler>(DeleteUsersCommandHandler);
        service         = module.get<DeleteUsersService>(DeleteUsersService);
    });

    describe('main', () =>
    {
        test('DeleteUsersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteUsersCommand()
            )).toBe(undefined);
        });
    });
});
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteRolesCommandHandler } from './delete-roles.command-handler';
import { DeleteRolesCommand } from './delete-roles.command';
import { DeleteRolesService } from './delete-roles.service';

describe('DeleteRolesCommandHandler', () =>
{
    let commandHandler: DeleteRolesCommandHandler;
    let service: DeleteRolesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteRolesCommandHandler,
                {
                    provide: DeleteRolesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteRolesCommandHandler>(DeleteRolesCommandHandler);
        service         = module.get<DeleteRolesService>(DeleteRolesService);
    });

    describe('main', () =>
    {
        test('DeleteRolesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteRolesCommand()
            )).toBe(undefined);
        });
    });
});
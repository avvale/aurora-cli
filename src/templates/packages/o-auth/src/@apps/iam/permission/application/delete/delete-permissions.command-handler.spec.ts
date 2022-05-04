import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeletePermissionsCommandHandler } from './delete-permissions.command-handler';
import { DeletePermissionsCommand } from './delete-permissions.command';
import { DeletePermissionsService } from './delete-permissions.service';

describe('DeletePermissionsCommandHandler', () =>
{
    let commandHandler: DeletePermissionsCommandHandler;
    let service: DeletePermissionsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeletePermissionsCommandHandler,
                {
                    provide: DeletePermissionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeletePermissionsCommandHandler>(DeletePermissionsCommandHandler);
        service         = module.get<DeletePermissionsService>(DeletePermissionsService);
    });

    describe('main', () =>
    {
        test('DeletePermissionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeletePermissionsCommand()
            )).toBe(undefined);
        });
    });
});
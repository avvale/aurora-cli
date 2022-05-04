import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeletePermissionByIdCommandHandler } from './delete-permission-by-id.command-handler';
import { permissions } from '../../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';
import { DeletePermissionByIdCommand } from './delete-permission-by-id.command';
import { DeletePermissionByIdService } from './delete-permission-by-id.service';

describe('DeletePermissionByIdCommandHandler', () =>
{
    let commandHandler: DeletePermissionByIdCommandHandler;
    let service: DeletePermissionByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeletePermissionByIdCommandHandler,
                {
                    provide: DeletePermissionByIdService,
                    useValue: {
                        main: () => {},
                    }
                },
            ],
        }).compile();

        commandHandler  = module.get<DeletePermissionByIdCommandHandler>(DeletePermissionByIdCommandHandler);
        service         = module.get<DeletePermissionByIdService>(DeletePermissionByIdService);
    });

    describe('main', () =>
    {
        test('DeletePermissionByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeletePermissionByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeletePermissionByIdCommand(
                    permissions[0].id,
                )
            )).toBe(undefined);
        });
    });
});
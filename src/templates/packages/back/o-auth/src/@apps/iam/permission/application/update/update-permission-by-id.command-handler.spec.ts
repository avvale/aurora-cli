import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { permissions } from '@apps/iam/permission/infrastructure/seeds/permission.seed';
import { UpdatePermissionByIdCommandHandler } from './update-permission-by-id.command-handler';
import { UpdatePermissionByIdCommand } from './update-permission-by-id.command';
import { UpdatePermissionByIdService } from './update-permission-by-id.service';

describe('UpdatePermissionByIdCommandHandler', () =>
{
    let commandHandler: UpdatePermissionByIdCommandHandler;
    let service: UpdatePermissionByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdatePermissionByIdCommandHandler,
                {
                    provide : UpdatePermissionByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdatePermissionByIdCommandHandler>(UpdatePermissionByIdCommandHandler);
        service         = module.get<UpdatePermissionByIdService>(UpdatePermissionByIdService);
    });

    describe('main', () =>
    {
        test('UpdatePermissionByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permission created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdatePermissionByIdCommand(
                    {
                        id: permissions[0].id,
                        name: permissions[0].name,
                        boundedContextId: permissions[0].boundedContextId,
                        roleIds: permissions[0].roleIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
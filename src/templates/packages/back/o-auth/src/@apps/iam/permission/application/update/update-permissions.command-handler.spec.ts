import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { permissions } from '@apps/iam/permission/infrastructure/seeds/permission.seed';
import { UpdatePermissionsCommandHandler } from './update-permissions.command-handler';
import { UpdatePermissionsCommand } from './update-permissions.command';
import { UpdatePermissionsService } from './update-permissions.service';

describe('UpdatePermissionsCommandHandler', () =>
{
    let commandHandler: UpdatePermissionsCommandHandler;
    let service: UpdatePermissionsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdatePermissionsCommandHandler,
                {
                    provide : UpdatePermissionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdatePermissionsCommandHandler>(UpdatePermissionsCommandHandler);
        service         = module.get<UpdatePermissionsService>(UpdatePermissionsService);
    });

    describe('main', () =>
    {
        test('UpdatePermissionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permissions updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdatePermissionsCommand(
                    {
                        id: permissions[0].id,
                        name: permissions[0].name,
                        boundedContextId: permissions[0].boundedContextId,
                        roleIds: permissions[0].roleIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { permissions } from '@app/iam/permission/infrastructure/mock/mock-permission.data';
import { UpsertPermissionCommandHandler } from './upsert-permission.command-handler';
import { UpsertPermissionCommand } from './upsert-permission.command';
import { UpsertPermissionService } from './upsert-permission.service';

describe('UpsertPermissionCommandHandler', () =>
{
    let commandHandler: UpsertPermissionCommandHandler;
    let service: UpsertPermissionService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertPermissionCommandHandler,
                {
                    provide : UpsertPermissionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertPermissionCommandHandler>(UpsertPermissionCommandHandler);
        service         = module.get<UpsertPermissionService>(UpsertPermissionService);
    });

    describe('main', () =>
    {
        test('UpsertPermissionCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertPermissionService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertPermissionCommand(
                    {
                        id: permissions[0].id,
                        name: permissions[0].name,
                        boundedContextId: permissions[0].boundedContextId,
                        roleIds: permissions[0].roleIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { permissions } from '../../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';
import { UpdatePermissionCommandHandler } from './update-permission.command-handler';
import { UpdatePermissionCommand } from './update-permission.command';
import { UpdatePermissionService } from './update-permission.service';

describe('UpdatePermissionCommandHandler', () =>
{
    let commandHandler: UpdatePermissionCommandHandler;
    let service: UpdatePermissionService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdatePermissionCommandHandler,
                {
                    provide : UpdatePermissionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<UpdatePermissionCommandHandler>(UpdatePermissionCommandHandler);
        service         = module.get<UpdatePermissionService>(UpdatePermissionService);
    });

    describe('main', () =>
    {
        test('UpdatePermissionCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permission created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdatePermissionCommand(
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
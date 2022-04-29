import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { permissions } from '../../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';
import { CreatePermissionCommandHandler } from './create-permission.command-handler';
import { CreatePermissionCommand } from './create-permission.command';
import { CreatePermissionService } from './create-permission.service';

describe('CreatePermissionCommandHandler', () =>
{
    let commandHandler: CreatePermissionCommandHandler;
    let service: CreatePermissionService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreatePermissionCommandHandler,
                {
                    provide : CreatePermissionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<CreatePermissionCommandHandler>(CreatePermissionCommandHandler);
        service         = module.get<CreatePermissionService>(CreatePermissionService);
    });

    describe('main', () =>
    {
        test('CreatePermissionCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreatePermissionService', async () =>
        {
            expect(await commandHandler.execute(
                new CreatePermissionCommand(
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
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { permissions } from '../../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';
import { CreatePermissionsCommandHandler } from './create-permissions.command-handler';
import { CreatePermissionsCommand } from './create-permissions.command';
import { CreatePermissionsService } from './create-permissions.service';

describe('CreatePermissionsCommandHandler', () =>
{
    let commandHandler: CreatePermissionsCommandHandler;
    let service: CreatePermissionsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreatePermissionsCommandHandler,
                {
                    provide : CreatePermissionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<CreatePermissionsCommandHandler>(CreatePermissionsCommandHandler);
        service         = module.get<CreatePermissionsService>(CreatePermissionsService);
    });

    describe('main', () =>
    {
        test('CreatePermissionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return permissions createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreatePermissionsCommand(
                    permissions,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
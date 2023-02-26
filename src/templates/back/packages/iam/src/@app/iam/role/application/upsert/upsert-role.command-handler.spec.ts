import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { roles } from '@app/iam/role/infrastructure/mock/mock-role.data';
import { UpsertRoleCommandHandler } from './upsert-role.command-handler';
import { UpsertRoleCommand } from './upsert-role.command';
import { UpsertRoleService } from './upsert-role.service';

describe('UpsertRoleCommandHandler', () =>
{
    let commandHandler: UpsertRoleCommandHandler;
    let service: UpsertRoleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertRoleCommandHandler,
                {
                    provide : UpsertRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertRoleCommandHandler>(UpsertRoleCommandHandler);
        service         = module.get<UpsertRoleService>(UpsertRoleService);
    });

    describe('main', () =>
    {
        test('UpsertRoleCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertRoleService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertRoleCommand(
                    {
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
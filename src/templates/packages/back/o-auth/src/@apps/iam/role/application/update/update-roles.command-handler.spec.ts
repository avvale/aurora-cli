import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { denormalizedRoles as roles } from '@apps/iam/role/infrastructure/seeds/role.seed';
import { UpdateRolesCommandHandler } from './update-roles.command-handler';
import { UpdateRolesCommand } from './update-roles.command';
import { UpdateRolesService } from './update-roles.service';

describe('UpdateRolesCommandHandler', () =>
{
    let commandHandler: UpdateRolesCommandHandler;
    let service: UpdateRolesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateRolesCommandHandler,
                {
                    provide : UpdateRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateRolesCommandHandler>(UpdateRolesCommandHandler);
        service         = module.get<UpdateRolesService>(UpdateRolesService);
    });

    describe('main', () =>
    {
        test('UpdateRolesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an roles updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateRolesCommand(
                    {
                        id: roles[0].id,
                        name: roles[0].name,
                        isMaster: roles[0].isMaster,
                        permissionIds: roles[0].permissionIds,
                        accountIds: roles[0].accountIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
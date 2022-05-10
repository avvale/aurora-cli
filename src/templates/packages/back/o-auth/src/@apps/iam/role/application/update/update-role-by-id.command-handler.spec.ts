import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { denormalizedRoles as roles } from '@apps/iam/role/infrastructure/seeds/role.seed';
import { UpdateRoleByIdCommandHandler } from './update-role-by-id.command-handler';
import { UpdateRoleByIdCommand } from './update-role-by-id.command';
import { UpdateRoleByIdService } from './update-role-by-id.service';

describe('UpdateRoleByIdCommandHandler', () =>
{
    let commandHandler: UpdateRoleByIdCommandHandler;
    let service: UpdateRoleByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateRoleByIdCommandHandler,
                {
                    provide : UpdateRoleByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateRoleByIdCommandHandler>(UpdateRoleByIdCommandHandler);
        service         = module.get<UpdateRoleByIdService>(UpdateRoleByIdService);
    });

    describe('main', () =>
    {
        test('UpdateRoleByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an role created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateRoleByIdCommand(
                    {
                        id: roles[0].id,
                        name: roles[0].name,
                        isMaster: roles[0].isMaster,
                        permissionIds: roles[0].permissionIds,
                        accountIds: roles[0].accountIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
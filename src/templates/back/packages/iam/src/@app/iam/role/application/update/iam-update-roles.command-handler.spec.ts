import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockRoleData } from '@app/iam/role/infrastructure/mock/iam-mock-role.data';
import { IamUpdateRolesCommandHandler } from './iam-update-roles.command-handler';
import { IamUpdateRolesCommand } from './iam-update-roles.command';
import { IamUpdateRolesService } from './iam-update-roles.service';

describe('IamUpdateRolesCommandHandler', () =>
{
    let commandHandler: IamUpdateRolesCommandHandler;
    let service: IamUpdateRolesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateRolesCommandHandler,
                {
                    provide : IamUpdateRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateRolesCommandHandler>(IamUpdateRolesCommandHandler);
        service = module.get<IamUpdateRolesService>(IamUpdateRolesService);
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
                new IamUpdateRolesCommand(
                    {
                        id: iamMockRoleData[0].id,
                        name: iamMockRoleData[0].name,
                        isMaster: iamMockRoleData[0].isMaster,
                        permissionIds: iamMockRoleData[0].permissionIds,
                        accountIds: iamMockRoleData[0].accountIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

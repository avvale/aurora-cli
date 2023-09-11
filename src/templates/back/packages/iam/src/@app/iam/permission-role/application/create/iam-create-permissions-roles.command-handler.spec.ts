import { IamCreatePermissionsRolesCommand, iamMockPermissionRoleData } from '@app/iam/permission-role';
import { IamCreatePermissionsRolesCommandHandler } from '@app/iam/permission-role/application/create/iam-create-permissions-roles.command-handler';
import { IamCreatePermissionsRolesService } from '@app/iam/permission-role/application/create/iam-create-permissions-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('iamCreatePermissionsRolesCommandHandler', () =>
{
    let commandHandler: IamCreatePermissionsRolesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreatePermissionsRolesCommandHandler,
                {
                    provide : IamCreatePermissionsRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreatePermissionsRolesCommandHandler>(IamCreatePermissionsRolesCommandHandler);
    });

    describe('main', () =>
    {
        test('IamCreatePermissionsRolesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockPermissionRoleData created', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreatePermissionsRolesCommand(
                    iamMockPermissionRoleData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

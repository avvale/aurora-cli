import { iamMockPermissionRoleData, IamUpdateAndIncrementPermissionsRolesCommand } from '@app/iam/permission-role';
import { IamUpdateAndIncrementPermissionsRolesCommandHandler } from '@app/iam/permission-role/application/update/iam-update-and-increment-permissions-roles.command-handler';
import { IamUpdateAndIncrementPermissionsRolesService } from '@app/iam/permission-role/application/update/iam-update-and-increment-permissions-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementPermissionsRolesCommandHandler', () =>
{
    let commandHandler: IamUpdateAndIncrementPermissionsRolesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAndIncrementPermissionsRolesCommandHandler,
                {
                    provide : IamUpdateAndIncrementPermissionsRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAndIncrementPermissionsRolesCommandHandler>(IamUpdateAndIncrementPermissionsRolesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementPermissionsRolesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permissionsRoles updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new IamUpdateAndIncrementPermissionsRolesCommand(
                    {
                        permissionId: iamMockPermissionRoleData[0].permissionId,
                        roleId: iamMockPermissionRoleData[0].roleId,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});

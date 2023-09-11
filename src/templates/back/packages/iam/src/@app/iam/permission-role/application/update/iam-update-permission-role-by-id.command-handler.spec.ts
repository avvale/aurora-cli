import { iamMockPermissionRoleData, IamUpdatePermissionRoleByIdCommand } from '@app/iam/permission-role';
import { IamUpdatePermissionRoleByIdCommandHandler } from '@app/iam/permission-role/application/update/iam-update-permission-role-by-id.command-handler';
import { IamUpdatePermissionRoleByIdService } from '@app/iam/permission-role/application/update/iam-update-permission-role-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionRoleByIdCommandHandler', () =>
{
    let commandHandler: IamUpdatePermissionRoleByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdatePermissionRoleByIdCommandHandler,
                {
                    provide : IamUpdatePermissionRoleByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdatePermissionRoleByIdCommandHandler>(IamUpdatePermissionRoleByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdatePermissionRoleByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permissionRole created', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdatePermissionRoleByIdCommand(
                    {
                        permissionId: iamMockPermissionRoleData[0].permissionId,
                        roleId: iamMockPermissionRoleData[0].roleId,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

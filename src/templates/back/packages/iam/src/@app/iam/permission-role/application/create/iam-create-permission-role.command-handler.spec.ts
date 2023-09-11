import { IamCreatePermissionRoleCommandHandler } from './iam-create-permission-role.command-handler';
import { IamCreatePermissionRoleService } from './iam-create-permission-role.service';
import { IamCreatePermissionRoleCommand, iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionRoleCommandHandler', () =>
{
    let commandHandler: IamCreatePermissionRoleCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreatePermissionRoleCommandHandler,
                {
                    provide : IamCreatePermissionRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreatePermissionRoleCommandHandler>(IamCreatePermissionRoleCommandHandler);
    });

    describe('main', () =>
    {
        test('CreatePermissionRoleCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the IamCreatePermissionRoleService', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreatePermissionRoleCommand(
                    {
                        permissionId: iamMockPermissionRoleData[0].permissionId,
                        roleId: iamMockPermissionRoleData[0].roleId,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

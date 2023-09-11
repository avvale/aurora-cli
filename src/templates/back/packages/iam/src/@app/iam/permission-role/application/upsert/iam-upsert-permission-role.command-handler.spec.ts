import { iamMockPermissionRoleData, IamUpsertPermissionRoleCommand } from '@app/iam/permission-role';
import { IamUpsertPermissionRoleCommandHandler } from '@app/iam/permission-role/application/upsert/iam-upsert-permission-role.command-handler';
import { IamUpsertPermissionRoleService } from '@app/iam/permission-role/application/upsert/iam-upsert-permission-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertPermissionRoleCommandHandler', () =>
{
    let commandHandler: IamUpsertPermissionRoleCommandHandler;
    let service: IamUpsertPermissionRoleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertPermissionRoleCommandHandler,
                {
                    provide : IamUpsertPermissionRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertPermissionRoleCommandHandler>(IamUpsertPermissionRoleCommandHandler);
        service = module.get<IamUpsertPermissionRoleService>(IamUpsertPermissionRoleService);
    });

    describe('main', () =>
    {
        test('UpsertPermissionRoleCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertPermissionRoleService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertPermissionRoleCommand(
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

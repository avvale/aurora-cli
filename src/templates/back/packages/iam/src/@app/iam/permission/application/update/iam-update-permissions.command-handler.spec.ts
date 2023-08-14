import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockPermissionData } from '@app/iam/permission/infrastructure/mock/iam-mock-permission.data';
import { IamUpdatePermissionsCommandHandler } from './iam-update-permissions.command-handler';
import { IamUpdatePermissionsCommand } from './iam-update-permissions.command';
import { IamUpdatePermissionsService } from './iam-update-permissions.service';

describe('IamUpdatePermissionsCommandHandler', () =>
{
    let commandHandler: IamUpdatePermissionsCommandHandler;
    let service: IamUpdatePermissionsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdatePermissionsCommandHandler,
                {
                    provide : IamUpdatePermissionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdatePermissionsCommandHandler>(IamUpdatePermissionsCommandHandler);
        service = module.get<IamUpdatePermissionsService>(IamUpdatePermissionsService);
    });

    describe('main', () =>
    {
        test('UpdatePermissionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permissions updated', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdatePermissionsCommand(
                    {
                        id: iamMockPermissionData[0].id,
                        name: iamMockPermissionData[0].name,
                        boundedContextId: iamMockPermissionData[0].boundedContextId,
                        roleIds: iamMockPermissionData[0].roleIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

import { IamGetPermissionsRolesController, IamGetPermissionsRolesHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetPermissionsRolesController', () =>
{
    let controller: IamGetPermissionsRolesController;
    let handler: IamGetPermissionsRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamGetPermissionsRolesController,
            ],
            providers: [
                {
                    provide : IamGetPermissionsRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamGetPermissionsRolesController>(IamGetPermissionsRolesController);
        handler = module.get<IamGetPermissionsRolesHandler>(IamGetPermissionsRolesHandler);
    });

    describe('main', () =>
    {
        test('IamGetPermissionsRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockPermissionRoleData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData)));
            expect(await controller.main()).toBe(iamMockPermissionRoleData);
        });
    });
});

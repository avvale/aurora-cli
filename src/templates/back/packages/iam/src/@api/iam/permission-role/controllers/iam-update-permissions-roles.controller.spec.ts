import { IamUpdatePermissionsRolesController, IamUpdatePermissionsRolesHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionsRolesController', () =>
{
    let controller: IamUpdatePermissionsRolesController;
    let handler: IamUpdatePermissionsRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdatePermissionsRolesController,
            ],
            providers: [
                {
                    provide : IamUpdatePermissionsRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdatePermissionsRolesController>(IamUpdatePermissionsRolesController);
        handler = module.get<IamUpdatePermissionsRolesHandler>(IamUpdatePermissionsRolesHandler);
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionsRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a permissionsRoles updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData[0])));
            expect(await controller.main(iamMockPermissionRoleData[0])).toBe(iamMockPermissionRoleData[0]);
        });
    });
});

import {
    IamDeletePermissionsRolesController,
    IamDeletePermissionsRolesHandler,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionsRolesController', () => {
    let controller: IamDeletePermissionsRolesController;
    let handler: IamDeletePermissionsRolesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamDeletePermissionsRolesController],
            providers: [
                {
                    provide: IamDeletePermissionsRolesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeletePermissionsRolesController>(
            IamDeletePermissionsRolesController,
        );
        handler = module.get<IamDeletePermissionsRolesHandler>(
            IamDeletePermissionsRolesHandler,
        );
    });

    describe('main', () => {
        test('IamDeletePermissionsRolesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockPermissionRoleData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockPermissionRoleData),
                    ),
            );
            expect(await controller.main()).toBe(iamMockPermissionRoleData);
        });
    });
});

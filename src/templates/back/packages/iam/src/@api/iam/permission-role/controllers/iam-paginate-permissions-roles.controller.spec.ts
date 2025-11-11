import {
    IamPaginatePermissionsRolesController,
    IamPaginatePermissionsRolesHandler,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginatePermissionsRolesController', () => {
    let controller: IamPaginatePermissionsRolesController;
    let handler: IamPaginatePermissionsRolesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamPaginatePermissionsRolesController],
            providers: [
                {
                    provide: IamPaginatePermissionsRolesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamPaginatePermissionsRolesController>(
            IamPaginatePermissionsRolesController,
        );
        handler = module.get<IamPaginatePermissionsRolesHandler>(
            IamPaginatePermissionsRolesHandler,
        );
    });

    describe('main', () => {
        test('IamPaginatePermissionsRolesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockPermissionRoleData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: iamMockPermissionRoleData,
                        }),
                    ),
            );
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: iamMockPermissionRoleData,
            });
        });
    });
});

import {
    IamFindPermissionRoleController,
    IamFindPermissionRoleHandler,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionRoleController', () => {
    let controller: IamFindPermissionRoleController;
    let handler: IamFindPermissionRoleHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamFindPermissionRoleController],
            providers: [
                {
                    provide: IamFindPermissionRoleHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindPermissionRoleController>(
            IamFindPermissionRoleController,
        );
        handler = module.get<IamFindPermissionRoleHandler>(
            IamFindPermissionRoleHandler,
        );
    });

    describe('main', () => {
        test('IamFindPermissionRoleController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a permissionRole', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockPermissionRoleData[0]),
                    ),
            );
            expect(await controller.main()).toBe(iamMockPermissionRoleData[0]);
        });
    });
});

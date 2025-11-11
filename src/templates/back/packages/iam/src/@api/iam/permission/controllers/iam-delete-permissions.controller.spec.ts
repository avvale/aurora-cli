import {
    IamDeletePermissionsController,
    IamDeletePermissionsHandler,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionsController', () => {
    let controller: IamDeletePermissionsController;
    let handler: IamDeletePermissionsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamDeletePermissionsController],
            providers: [
                {
                    provide: IamDeletePermissionsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeletePermissionsController>(
            IamDeletePermissionsController,
        );
        handler = module.get<IamDeletePermissionsHandler>(
            IamDeletePermissionsHandler,
        );
    });

    describe('main', () => {
        test('IamDeletePermissionsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockPermissionData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockPermissionData)),
            );
            expect(await controller.main()).toBe(iamMockPermissionData);
        });
    });
});

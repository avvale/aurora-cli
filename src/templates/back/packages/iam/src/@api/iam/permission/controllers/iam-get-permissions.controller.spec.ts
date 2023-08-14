import { IamGetPermissionsController, IamGetPermissionsHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetPermissionsController', () =>
{
    let controller: IamGetPermissionsController;
    let handler: IamGetPermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamGetPermissionsController,
            ],
            providers: [
                {
                    provide : IamGetPermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamGetPermissionsController>(IamGetPermissionsController);
        handler = module.get<IamGetPermissionsHandler>(IamGetPermissionsHandler);
    });

    describe('main', () =>
    {
        test('IamGetPermissionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockPermissionData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionData)));
            expect(await controller.main()).toBe(iamMockPermissionData);
        });
    });
});

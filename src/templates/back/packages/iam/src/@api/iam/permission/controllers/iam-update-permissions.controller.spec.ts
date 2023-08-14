import { IamUpdatePermissionsController, IamUpdatePermissionsHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionsController', () =>
{
    let controller: IamUpdatePermissionsController;
    let handler: IamUpdatePermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdatePermissionsController,
            ],
            providers: [
                {
                    provide : IamUpdatePermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdatePermissionsController>(IamUpdatePermissionsController);
        handler = module.get<IamUpdatePermissionsHandler>(IamUpdatePermissionsHandler);
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a permissions updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionData[0])));
            expect(await controller.main(iamMockPermissionData[0])).toBe(iamMockPermissionData[0]);
        });
    });
});

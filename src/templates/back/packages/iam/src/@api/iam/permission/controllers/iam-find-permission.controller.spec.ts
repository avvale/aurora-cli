import { IamFindPermissionController, IamFindPermissionHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionController', () =>
{
    let controller: IamFindPermissionController;
    let handler: IamFindPermissionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindPermissionController,
            ],
            providers: [
                {
                    provide : IamFindPermissionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamFindPermissionController>(IamFindPermissionController);
        handler = module.get<IamFindPermissionHandler>(IamFindPermissionHandler);
    });

    describe('main', () =>
    {
        test('IamFindPermissionController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a permission', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionData[0])));
            expect(await controller.main()).toBe(iamMockPermissionData[0]);
        });
    });
});

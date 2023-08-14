import { IamUpdatePermissionByIdController, IamUpdatePermissionByIdHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionByIdController', () =>
{
    let controller: IamUpdatePermissionByIdController;
    let handler: IamUpdatePermissionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdatePermissionByIdController,
            ],
            providers: [
                {
                    provide : IamUpdatePermissionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdatePermissionByIdController>(IamUpdatePermissionByIdController);
        handler = module.get<IamUpdatePermissionByIdHandler>(IamUpdatePermissionByIdHandler);
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a permission updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionData[0])));
            expect(await controller.main(iamMockPermissionData[0])).toBe(iamMockPermissionData[0]);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteTenantByIdController, IamDeleteTenantByIdHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantByIdController', () =>
{
    let controller: IamDeleteTenantByIdController;
    let handler: IamDeleteTenantByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteTenantByIdController,
            ],
            providers: [
                {
                    provide : IamDeleteTenantByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamDeleteTenantByIdController>(IamDeleteTenantByIdController);
        handler = module.get<IamDeleteTenantByIdHandler>(IamDeleteTenantByIdHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenant deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData[0])));
            expect(await controller.main(iamMockTenantData[0].id)).toBe(iamMockTenantData[0]);
        });
    });
});

import { IamFindTenantByIdController, IamFindTenantByIdHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantByIdController', () =>
{
    let controller: IamFindTenantByIdController;
    let handler: IamFindTenantByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindTenantByIdController,
            ],
            providers: [
                {
                    provide : IamFindTenantByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamFindTenantByIdController>(IamFindTenantByIdController);
        handler = module.get<IamFindTenantByIdHandler>(IamFindTenantByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindTenantByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenant by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData[0])));
            expect(await controller.main(iamMockTenantData[0].id)).toBe(iamMockTenantData[0]);
        });
    });
});

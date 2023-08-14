import { IamGetTenantsController, IamGetTenantsHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTenantsController', () =>
{
    let controller: IamGetTenantsController;
    let handler: IamGetTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamGetTenantsController,
            ],
            providers: [
                {
                    provide : IamGetTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamGetTenantsController>(IamGetTenantsController);
        handler = module.get<IamGetTenantsHandler>(IamGetTenantsHandler);
    });

    describe('main', () =>
    {
        test('IamGetTenantsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockTenantData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData)));
            expect(await controller.main()).toBe(iamMockTenantData);
        });
    });
});

import { IamUpsertTenantController, IamUpsertTenantHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTenantController', () =>
{
    let controller: IamUpsertTenantController;
    let handler: IamUpsertTenantHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertTenantController,
            ],
            providers: [
                {
                    provide : IamUpsertTenantHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertTenantController>(IamUpsertTenantController);
        handler = module.get<IamUpsertTenantHandler>(IamUpsertTenantHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertTenantController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenant upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData[0])));
            expect(await controller.main(iamMockTenantData[0])).toBe(iamMockTenantData[0]);
        });
    });
});

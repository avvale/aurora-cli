import { IamUpsertTenantAccountController, IamUpsertTenantAccountHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTenantAccountController', () =>
{
    let controller: IamUpsertTenantAccountController;
    let handler: IamUpsertTenantAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertTenantAccountController,
            ],
            providers: [
                {
                    provide : IamUpsertTenantAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertTenantAccountController>(IamUpsertTenantAccountController);
        handler = module.get<IamUpsertTenantAccountHandler>(IamUpsertTenantAccountHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertTenantAccountController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenantAccount upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantAccountData[0])));
            expect(await controller.main(iamMockTenantAccountData[0])).toBe(iamMockTenantAccountData[0]);
        });
    });
});

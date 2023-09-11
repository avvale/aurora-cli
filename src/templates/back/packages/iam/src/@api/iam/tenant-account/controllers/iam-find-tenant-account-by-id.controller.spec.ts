import { IamFindTenantAccountByIdController, IamFindTenantAccountByIdHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantAccountByIdController', () =>
{
    let controller: IamFindTenantAccountByIdController;
    let handler: IamFindTenantAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindTenantAccountByIdController,
            ],
            providers: [
                {
                    provide : IamFindTenantAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamFindTenantAccountByIdController>(IamFindTenantAccountByIdController);
        handler = module.get<IamFindTenantAccountByIdHandler>(IamFindTenantAccountByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindTenantAccountByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenantAccount by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantAccountData[0])));
            expect(await controller.main(iamMockTenantAccountData[0].id)).toBe(iamMockTenantAccountData[0]);
        });
    });
});

import { IamPaginateTenantsAccountsController, IamPaginateTenantsAccountsHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTenantsAccountsController', () =>
{
    let controller: IamPaginateTenantsAccountsController;
    let handler: IamPaginateTenantsAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamPaginateTenantsAccountsController,
            ],
            providers: [
                {
                    provide : IamPaginateTenantsAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamPaginateTenantsAccountsController>(IamPaginateTenantsAccountsController);
        handler = module.get<IamPaginateTenantsAccountsHandler>(IamPaginateTenantsAccountsHandler);
    });

    describe('main', () =>
    {
        test('IamPaginateTenantsAccountsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockTenantAccountData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : iamMockTenantAccountData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : iamMockTenantAccountData,
            });
        });
    });
});

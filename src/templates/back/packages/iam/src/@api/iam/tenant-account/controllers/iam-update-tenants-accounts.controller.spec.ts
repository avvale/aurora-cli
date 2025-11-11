import {
    IamUpdateTenantsAccountsController,
    IamUpdateTenantsAccountsHandler,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantsAccountsController', () => {
    let controller: IamUpdateTenantsAccountsController;
    let handler: IamUpdateTenantsAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamUpdateTenantsAccountsController],
            providers: [
                {
                    provide: IamUpdateTenantsAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateTenantsAccountsController>(
            IamUpdateTenantsAccountsController,
        );
        handler = module.get<IamUpdateTenantsAccountsHandler>(
            IamUpdateTenantsAccountsHandler,
        );
    });

    describe('main', () => {
        test('IamUpdateTenantsAccountsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a tenantsAccounts updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockTenantAccountData[0]),
                    ),
            );
            expect(await controller.main(iamMockTenantAccountData[0])).toBe(
                iamMockTenantAccountData[0],
            );
        });
    });
});

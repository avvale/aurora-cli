import {
    IamDeleteTenantsAccountsController,
    IamDeleteTenantsAccountsHandler,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantsAccountsController', () => {
    let controller: IamDeleteTenantsAccountsController;
    let handler: IamDeleteTenantsAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamDeleteTenantsAccountsController],
            providers: [
                {
                    provide: IamDeleteTenantsAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteTenantsAccountsController>(
            IamDeleteTenantsAccountsController,
        );
        handler = module.get<IamDeleteTenantsAccountsHandler>(
            IamDeleteTenantsAccountsHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteTenantsAccountsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockTenantAccountData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(iamMockTenantAccountData)),
            );
            expect(await controller.main()).toBe(iamMockTenantAccountData);
        });
    });
});

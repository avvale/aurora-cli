import {
    IamCreateTenantsAccountsController,
    IamCreateTenantsAccountsHandler,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantsAccountsController', () => {
    let controller: IamCreateTenantsAccountsController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [IamCreateTenantsAccountsController],
            providers: [
                {
                    provide: IamCreateTenantsAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateTenantsAccountsController>(
            IamCreateTenantsAccountsController,
        );
    });

    describe('main', () => {
        test('IamCreateTenantsAccountsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockTenantAccountData created', async () => {
            expect(await controller.main(iamMockTenantAccountData)).toBe(
                undefined,
            );
        });
    });
});

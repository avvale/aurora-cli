import {
    IamGetTenantsAccountsController,
    IamGetTenantsAccountsHandler,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTenantsAccountsController', () => {
    let controller: IamGetTenantsAccountsController;
    let handler: IamGetTenantsAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamGetTenantsAccountsController],
            providers: [
                {
                    provide: IamGetTenantsAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamGetTenantsAccountsController>(
            IamGetTenantsAccountsController,
        );
        handler = module.get<IamGetTenantsAccountsHandler>(
            IamGetTenantsAccountsHandler,
        );
    });

    describe('main', () => {
        test('IamGetTenantsAccountsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockTenantAccountData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(iamMockTenantAccountData)),
            );
            expect(await controller.main()).toBe(iamMockTenantAccountData);
        });
    });
});

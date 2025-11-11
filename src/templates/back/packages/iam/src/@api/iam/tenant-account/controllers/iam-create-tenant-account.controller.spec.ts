import {
    IamCreateTenantAccountController,
    IamCreateTenantAccountHandler,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantAccountController', () => {
    let controller: IamCreateTenantAccountController;
    let handler: IamCreateTenantAccountHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamCreateTenantAccountController],
            providers: [
                {
                    provide: IamCreateTenantAccountHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateTenantAccountController>(
            IamCreateTenantAccountController,
        );
        handler = module.get<IamCreateTenantAccountHandler>(
            IamCreateTenantAccountHandler,
        );
    });

    describe('main', () => {
        test('IamCreateTenantAccountController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an tenantAccount created', async () => {
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

import {
    IamDeleteTenantsController,
    IamDeleteTenantsHandler,
} from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantsController', () => {
    let controller: IamDeleteTenantsController;
    let handler: IamDeleteTenantsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamDeleteTenantsController],
            providers: [
                {
                    provide: IamDeleteTenantsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteTenantsController>(
            IamDeleteTenantsController,
        );
        handler = module.get<IamDeleteTenantsHandler>(IamDeleteTenantsHandler);
    });

    describe('main', () => {
        test('IamDeleteTenantsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockTenantData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData)),
            );
            expect(await controller.main()).toBe(iamMockTenantData);
        });
    });
});

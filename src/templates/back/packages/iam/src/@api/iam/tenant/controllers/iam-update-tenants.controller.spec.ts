import {
    IamUpdateTenantsController,
    IamUpdateTenantsHandler,
} from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantsController', () => {
    let controller: IamUpdateTenantsController;
    let handler: IamUpdateTenantsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamUpdateTenantsController],
            providers: [
                {
                    provide: IamUpdateTenantsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateTenantsController>(
            IamUpdateTenantsController,
        );
        handler = module.get<IamUpdateTenantsHandler>(IamUpdateTenantsHandler);
    });

    describe('main', () => {
        test('IamUpdateTenantsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a tenants updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData[0])),
            );
            expect(await controller.main(iamMockTenantData[0])).toBe(
                iamMockTenantData[0],
            );
        });
    });
});

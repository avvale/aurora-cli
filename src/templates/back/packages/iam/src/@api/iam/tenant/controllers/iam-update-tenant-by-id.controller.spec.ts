import {
    IamUpdateTenantByIdController,
    IamUpdateTenantByIdHandler,
} from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantByIdController', () => {
    let controller: IamUpdateTenantByIdController;
    let handler: IamUpdateTenantByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamUpdateTenantByIdController],
            providers: [
                {
                    provide: IamUpdateTenantByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateTenantByIdController>(
            IamUpdateTenantByIdController,
        );
        handler = module.get<IamUpdateTenantByIdHandler>(
            IamUpdateTenantByIdHandler,
        );
    });

    describe('main', () => {
        test('IamUpdateTenantByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a tenant updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData[0])),
            );
            expect(await controller.main(iamMockTenantData[0])).toBe(
                iamMockTenantData[0],
            );
        });
    });
});

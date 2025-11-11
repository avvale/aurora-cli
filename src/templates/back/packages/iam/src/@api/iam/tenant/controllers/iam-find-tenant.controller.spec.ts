import { IamFindTenantController, IamFindTenantHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantController', () => {
    let controller: IamFindTenantController;
    let handler: IamFindTenantHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamFindTenantController],
            providers: [
                {
                    provide: IamFindTenantHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindTenantController>(
            IamFindTenantController,
        );
        handler = module.get<IamFindTenantHandler>(IamFindTenantHandler);
    });

    describe('main', () => {
        test('IamFindTenantController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a tenant', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData[0])),
            );
            expect(await controller.main()).toBe(iamMockTenantData[0]);
        });
    });
});

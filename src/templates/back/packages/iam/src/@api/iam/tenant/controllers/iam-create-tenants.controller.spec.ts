import { IamCreateTenantsController, IamCreateTenantsHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantsController', () =>
{
    let controller: IamCreateTenantsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateTenantsController,
            ],
            providers: [
                {
                    provide : IamCreateTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamCreateTenantsController>(IamCreateTenantsController);
    });

    describe('main', () =>
    {
        test('IamCreateTenantsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockTenantData created', async () =>
        {
            expect(
                await controller.main(
                    iamMockTenantData,
                ),
            )
                .toBe(undefined);
        });
    });
});

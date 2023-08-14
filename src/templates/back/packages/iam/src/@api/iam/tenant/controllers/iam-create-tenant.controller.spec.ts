import { IamCreateTenantController, IamCreateTenantHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantController', () =>
{
    let controller: IamCreateTenantController;
    let handler: IamCreateTenantHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCreateTenantController,
            ],
            providers: [
                {
                    provide : IamCreateTenantHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamCreateTenantController>(IamCreateTenantController);
        handler = module.get<IamCreateTenantHandler>(IamCreateTenantHandler);
    });

    describe('main', () =>
    {
        test('IamCreateTenantController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenant created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData[0])));
            expect(
                await controller.main(
                    iamMockTenantData[0],
                ),
            )
                .toBe(iamMockTenantData[0]);
        });
    });
});

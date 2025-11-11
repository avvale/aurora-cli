import { IamCreateTenantsHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantsHandler', () => {
    let handler: IamCreateTenantsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTenantsHandler,
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamCreateTenantsHandler>(IamCreateTenantsHandler);
    });

    describe('main', () => {
        test('IamCreateTenantsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an iamMockTenantData created', async () => {
            expect(await handler.main(iamMockTenantData)).toBe(true);
        });
    });
});

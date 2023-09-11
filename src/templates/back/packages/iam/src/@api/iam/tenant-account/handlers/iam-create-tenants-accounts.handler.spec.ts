import { IamCreateTenantsAccountsHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantsAccountsHandler', () =>
{
    let handler: IamCreateTenantsAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTenantsAccountsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamCreateTenantsAccountsHandler>(IamCreateTenantsAccountsHandler);
    });

    describe('main', () =>
    {
        test('IamCreateTenantsAccountsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an iamMockTenantAccountData created', async () =>
        {
            expect(await handler.main(iamMockTenantAccountData)).toBe(true);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetTenantsAccountsHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTenantsAccountsHandler', () =>
{
    let handler: IamGetTenantsAccountsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetTenantsAccountsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamGetTenantsAccountsHandler>(IamGetTenantsAccountsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamGetTenantsAccountsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetTenantsAccountsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a iamMockTenantAccountData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantAccountData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockTenantAccountData);
        });
    });
});

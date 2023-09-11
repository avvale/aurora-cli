/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpsertTenantAccountHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTenantAccountHandler', () =>
{
    let handler: IamUpsertTenantAccountHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertTenantAccountHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamUpsertTenantAccountHandler>(IamUpsertTenantAccountHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamUpsertTenantAccountHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an tenantAccount upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantAccountData[0])));
            expect(
                await handler.main(
                    iamMockTenantAccountData[0],
                    'Europe/Madrid',
                ))
                .toBe(iamMockTenantAccountData[0]);
        });
    });
});

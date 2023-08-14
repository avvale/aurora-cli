/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpsertTenantHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTenantHandler', () =>
{
    let handler: IamUpsertTenantHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertTenantHandler,
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

        handler = module.get<IamUpsertTenantHandler>(IamUpsertTenantHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamUpsertTenantHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an tenant upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData[0])));
            expect(
                await handler.main(
                    iamMockTenantData[0],
                    'Europe/Madrid',
                ))
                .toBe(iamMockTenantData[0]);
        });
    });
});

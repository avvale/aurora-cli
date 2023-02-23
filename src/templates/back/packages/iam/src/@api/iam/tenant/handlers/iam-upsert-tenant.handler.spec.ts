/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { IamUpsertTenantHandler } from './iam-upsert-tenant.handler';

// sources
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamUpsertTenantHandler', () =>
{
    let handler: IamUpsertTenantHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

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

        handler     = module.get<IamUpsertTenantHandler>(IamUpsertTenantHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamUpsertTenantHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an tenant upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await handler.main(tenants[0])).toBe(tenants[0]);
        });
    });
});
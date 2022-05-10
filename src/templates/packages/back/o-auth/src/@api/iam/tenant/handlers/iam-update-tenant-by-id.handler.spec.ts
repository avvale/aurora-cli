/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamUpdateTenantByIdHandler } from './iam-update-tenant-by-id.handler';
import { IamUpdateTenantByIdInput } from '../../../../graphql';

// sources
import { tenants } from '@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamUpdateTenantByIdHandler', () =>
{
    let handler: IamUpdateTenantByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateTenantByIdHandler,
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

        handler     = module.get<IamUpdateTenantByIdHandler>(IamUpdateTenantByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateTenantByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateTenantByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a tenant updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await handler.main(<IamUpdateTenantByIdInput>tenants[0])).toBe(tenants[0]);
        });
    });
});
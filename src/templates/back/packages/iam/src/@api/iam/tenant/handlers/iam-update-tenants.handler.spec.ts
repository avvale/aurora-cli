/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTenantsInput } from '@api/graphql';
import { IamUpdateTenantsHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantsHandler', () =>
{
    let handler: IamUpdateTenantsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateTenantsHandler,
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

        handler = module.get<IamUpdateTenantsHandler>(IamUpdateTenantsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdateTenantsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateTenantsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a tenants updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData[0])));
            expect(
                await handler.main(
                    <IamUpdateTenantsInput>iamMockTenantData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockTenantData[0]);
        });
    });
});

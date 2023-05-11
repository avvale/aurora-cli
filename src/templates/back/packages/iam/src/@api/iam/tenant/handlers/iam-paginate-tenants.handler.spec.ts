/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamPaginateTenantsHandler } from './iam-paginate-tenants.handler';

// sources
import { tenants } from '@app/iam/tenant/infrastructure/mock/mock-tenant.data';

describe('IamPaginateTenantsHandler', () =>
{
    let handler: IamPaginateTenantsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateTenantsHandler,
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

        handler = module.get<IamPaginateTenantsHandler>(IamPaginateTenantsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('IamPaginateTenantsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateTenantsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a tenants', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: tenants.length,
                count: tenants.length,
                rows : tenants,
            })));
            expect(await handler.main()).toEqual({
                total: tenants.length,
                count: tenants.length,
                rows : tenants,
            });
        });
    });
});
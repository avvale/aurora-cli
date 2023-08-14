/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateTenantsHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTenantsHandler', () =>
{
    let handler: IamPaginateTenantsHandler;
    let queryBus: IQueryBus;

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
            ],
        })
            .compile();

        handler = module.get<IamPaginateTenantsHandler>(IamPaginateTenantsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
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
                total: iamMockTenantData.length,
                count: iamMockTenantData.length,
                rows : iamMockTenantData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: iamMockTenantData.length,
                    count: iamMockTenantData.length,
                    rows : iamMockTenantData,
                });
        });
    });
});

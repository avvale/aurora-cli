/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindTenantByIdHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantByIdHandler', () =>
{
    let handler: IamFindTenantByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindTenantByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindTenantByIdHandler>(IamFindTenantByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindTenantByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindTenantByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an tenant by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData[0])));
            expect(
                await handler.main(
                    iamMockTenantData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockTenantData[0]);
        });
    });
});

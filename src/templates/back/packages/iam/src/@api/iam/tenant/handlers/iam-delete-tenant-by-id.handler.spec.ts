/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteTenantByIdHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantByIdController', () =>
{
    let handler: IamDeleteTenantByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteTenantByIdHandler,
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

        handler = module.get<IamDeleteTenantByIdHandler>(IamDeleteTenantByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an tenant deleted', async () =>
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

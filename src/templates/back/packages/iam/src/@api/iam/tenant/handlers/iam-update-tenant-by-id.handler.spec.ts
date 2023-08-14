/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTenantByIdInput } from '@api/graphql';
import { IamUpdateTenantByIdHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantByIdHandler', () =>
{
    let handler: IamUpdateTenantByIdHandler;
    let queryBus: IQueryBus;

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

        handler = module.get<IamUpdateTenantByIdHandler>(IamUpdateTenantByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
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
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData[0])));
            expect(
                await handler.main(
                    <IamUpdateTenantByIdInput>iamMockTenantData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(iamMockTenantData[0]);
        });
    });
});

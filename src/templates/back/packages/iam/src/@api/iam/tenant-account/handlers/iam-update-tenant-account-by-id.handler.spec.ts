/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTenantAccountByIdInput } from '@api/graphql';
import { IamUpdateTenantAccountByIdHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantAccountByIdHandler', () => {
    let handler: IamUpdateTenantAccountByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateTenantAccountByIdHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamUpdateTenantAccountByIdHandler>(
            IamUpdateTenantAccountByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdateTenantAccountByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateTenantAccountByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a tenantAccount updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockTenantAccountData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <IamUpdateTenantAccountByIdInput>(
                        iamMockTenantAccountData[0]
                    ),
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockTenantAccountData[0]);
        });
    });
});

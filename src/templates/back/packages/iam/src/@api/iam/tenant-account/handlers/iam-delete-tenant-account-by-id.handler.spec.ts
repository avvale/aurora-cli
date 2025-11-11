/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteTenantAccountByIdHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantAccountByIdController', () => {
    let handler: IamDeleteTenantAccountByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeleteTenantAccountByIdHandler,
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

        handler = module.get<IamDeleteTenantAccountByIdHandler>(
            IamDeleteTenantAccountByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('IamDeleteTenantAccountByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an tenantAccount deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockTenantAccountData[0]),
                    ),
            );
            expect(
                await handler.main(
                    iamMockTenantAccountData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockTenantAccountData[0]);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateAccountsHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateAccountsHandler', () => {
    let handler: IamPaginateAccountsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamPaginateAccountsHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamPaginateAccountsHandler>(
            IamPaginateAccountsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamPaginateAccountsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamPaginateAccountsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a accounts', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: iamMockAccountData.length,
                            count: iamMockAccountData.length,
                            rows: iamMockAccountData,
                        }),
                    ),
            );
            expect(await handler.main({}, {})).toEqual({
                total: iamMockAccountData.length,
                count: iamMockAccountData.length,
                rows: iamMockAccountData,
            });
        });
    });
});

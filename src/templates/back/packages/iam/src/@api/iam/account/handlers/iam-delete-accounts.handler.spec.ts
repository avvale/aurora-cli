/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteAccountsHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteAccountsHandler', () => {
    let handler: IamDeleteAccountsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeleteAccountsHandler,
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

        handler = module.get<IamDeleteAccountsHandler>(
            IamDeleteAccountsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamDeleteAccountsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamDeleteAccountsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an iamMockAccountData deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockAccountData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                iamMockAccountData,
            );
        });
    });
});

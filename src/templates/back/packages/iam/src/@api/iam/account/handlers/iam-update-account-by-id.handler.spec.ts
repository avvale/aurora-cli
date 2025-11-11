/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateAccountByIdInput } from '@api/graphql';
import { IamUpdateAccountByIdHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAccountByIdHandler', () => {
    let handler: IamUpdateAccountByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateAccountByIdHandler,
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

        handler = module.get<IamUpdateAccountByIdHandler>(
            IamUpdateAccountByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdateAccountByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateAccountByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a account updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockAccountData[0])),
            );
            expect(
                await handler.main(
                    <IamUpdateAccountByIdInput>iamMockAccountData[0],
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockAccountData[0]);
        });
    });
});

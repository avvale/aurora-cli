/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamUpdateAccountByIdHandler } from './iam-update-account-by-id.handler';
import { IamUpdateAccountByIdInput } from '../../../../graphql';

// sources
import { accounts } from '@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamUpdateAccountByIdHandler', () =>
{
    let handler: IamUpdateAccountByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateAccountByIdHandler,
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

        handler     = module.get<IamUpdateAccountByIdHandler>(IamUpdateAccountByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateAccountByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateAccountByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a account updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await handler.main(<IamUpdateAccountByIdInput>accounts[0])).toBe(accounts[0]);
        });
    });
});
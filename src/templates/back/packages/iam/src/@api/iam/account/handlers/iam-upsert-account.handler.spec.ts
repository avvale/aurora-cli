/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { IamUpsertAccountHandler } from './iam-upsert-account.handler';

// sources
import { accounts } from '@app/iam/account/infrastructure/mock/mock-account.data';

describe('IamUpsertAccountHandler', () =>
{
    let handler: IamUpsertAccountHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertAccountHandler,
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

        handler     = module.get<IamUpsertAccountHandler>(IamUpsertAccountHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamUpsertAccountHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an account upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await handler.main(accounts[0])).toBe(accounts[0]);
        });
    });
});
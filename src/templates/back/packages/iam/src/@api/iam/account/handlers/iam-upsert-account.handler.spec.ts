/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpsertAccountHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertAccountHandler', () =>
{
    let handler: IamUpsertAccountHandler;
    let queryBus: IQueryBus;

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

        handler = module.get<IamUpsertAccountHandler>(IamUpsertAccountHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamUpsertAccountHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an account upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockAccountData[0])));
            expect(
                await handler.main(
                    iamMockAccountData[0],
                    'Europe/Madrid',
                ))
                .toBe(iamMockAccountData[0]);
        });
    });
});

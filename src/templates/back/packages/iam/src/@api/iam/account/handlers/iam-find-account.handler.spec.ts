/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindAccountHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindAccountHandler', () =>
{
    let handler: IamFindAccountHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindAccountHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindAccountHandler>(IamFindAccountHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindAccountHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindAccountHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a account', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockAccountData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockAccountData[0]);
        });
    });
});

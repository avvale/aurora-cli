/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindAccountByIdHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindAccountByIdHandler', () =>
{
    let handler: IamFindAccountByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindAccountByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindAccountByIdHandler>(IamFindAccountByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindAccountByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindAccountByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an account by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockAccountData[0])));
            expect(
                await handler.main(
                    iamMockAccountData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockAccountData[0]);
        });
    });
});

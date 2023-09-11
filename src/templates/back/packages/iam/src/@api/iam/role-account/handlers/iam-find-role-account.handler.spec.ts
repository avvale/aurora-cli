/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindRoleAccountHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleAccountHandler', () =>
{
    let handler: IamFindRoleAccountHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindRoleAccountHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindRoleAccountHandler>(IamFindRoleAccountHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindRoleAccountHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindRoleAccountHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a roleAccount', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleAccountData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockRoleAccountData[0]);
        });
    });
});

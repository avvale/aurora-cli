/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpsertRoleAccountHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertRoleAccountHandler', () =>
{
    let handler: IamUpsertRoleAccountHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertRoleAccountHandler,
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

        handler = module.get<IamUpsertRoleAccountHandler>(IamUpsertRoleAccountHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamUpsertRoleAccountHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an roleAccount upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleAccountData[0])));
            expect(
                await handler.main(
                    iamMockRoleAccountData[0],
                    'Europe/Madrid',
                ))
                .toBe(iamMockRoleAccountData[0]);
        });
    });
});

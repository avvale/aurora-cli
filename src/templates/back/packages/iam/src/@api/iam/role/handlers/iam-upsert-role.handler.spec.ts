/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpsertRoleHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertRoleHandler', () =>
{
    let handler: IamUpsertRoleHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertRoleHandler,
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

        handler = module.get<IamUpsertRoleHandler>(IamUpsertRoleHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamUpsertRoleHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an role upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleData[0])));
            expect(
                await handler.main(
                    iamMockRoleData[0],
                    'Europe/Madrid',
                ))
                .toBe(iamMockRoleData[0]);
        });
    });
});

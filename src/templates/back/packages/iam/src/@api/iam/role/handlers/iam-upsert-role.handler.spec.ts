/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { IamUpsertRoleHandler } from './iam-upsert-role.handler';

// sources
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

describe('IamUpsertRoleHandler', () =>
{
    let handler: IamUpsertRoleHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

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

        handler     = module.get<IamUpsertRoleHandler>(IamUpsertRoleHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamUpsertRoleHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an role upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await handler.main(roles[0])).toBe(roles[0]);
        });
    });
});
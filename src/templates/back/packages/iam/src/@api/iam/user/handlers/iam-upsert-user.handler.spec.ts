/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamUpsertUserHandler } from './iam-upsert-user.handler';

// sources
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

describe('IamUpsertUserHandler', () =>
{
    let handler: IamUpsertUserHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertUserHandler,
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

        handler     = module.get<IamUpsertUserHandler>(IamUpsertUserHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamUpsertUserHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an user upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await handler.main(users[0])).toBe(users[0]);
        });
    });
});
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamUpdateUsersHandler } from './iam-update-users.handler';
import { IamUpdateUsersInput } from '../../../../graphql';

// sources
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamUpdateUsersHandler', () =>
{
    let handler: IamUpdateUsersHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateUsersHandler,
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

        handler     = module.get<IamUpdateUsersHandler>(IamUpdateUsersHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateUsersHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateUsersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a users updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await handler.main(<IamUpdateUsersInput>users[0])).toBe(users[0]);
        });
    });
});
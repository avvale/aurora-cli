/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamFindUserDataByIdHandler } from './iam-find-user-data-by-id.handler';

// sources
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamFindUserByIdHandler', () =>
{
    let handler: IamFindUserDataByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindUserDataByIdHandler,
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

        handler = module.get<IamFindUserDataByIdHandler>(IamFindUserDataByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('IamFindUserByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindUserByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an user by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await handler.main(users[0].id)).toBe(users[0]);
        });
    });
});
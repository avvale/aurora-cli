import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreateUsersHandler } from './iam-create-users.handler';
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamCreateUsersHandler', () =>
{
    let handler: IamCreateUsersHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateUsersHandler,
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
        }).compile();

        handler     = module.get<IamCreateUsersHandler>(IamCreateUsersHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreateUsersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an users created', async () =>
        {
            expect(await handler.main(users)).toBe(true);
        });
    });
});
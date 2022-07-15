/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamUpdateUserDataByIdHandler } from './iam-update-user-data-by-id.handler';
import { IamUpdateUserByIdInput } from '../../../../graphql';

// sources
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamUpdateUserByIdHandler', () =>
{
    let handler: IamUpdateUserDataByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateUserDataByIdHandler,
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

        handler     = module.get<IamUpdateUserDataByIdHandler>(IamUpdateUserDataByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateUserByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateUserByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a user updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await handler.main(<IamUpdateUserByIdInput>users[0])).toBe(users[0]);
        });
    });
});
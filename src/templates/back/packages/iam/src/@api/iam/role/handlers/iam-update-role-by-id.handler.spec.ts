/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { IamUpdateRoleByIdHandler } from './iam-update-role-by-id.handler';
import { IamUpdateRoleByIdInput } from '@api/graphql';

// sources
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

describe('IamUpdateRoleByIdHandler', () =>
{
    let handler: IamUpdateRoleByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateRoleByIdHandler,
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

        handler     = module.get<IamUpdateRoleByIdHandler>(IamUpdateRoleByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateRoleByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateRoleByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a role updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await handler.main(<IamUpdateRoleByIdInput>roles[0])).toBe(roles[0]);
        });
    });
});
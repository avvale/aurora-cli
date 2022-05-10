/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamUpdateRolesHandler } from './iam-update-roles.handler';
import { IamUpdateRolesInput } from '../../../../graphql';

// sources
import { roles } from '@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamUpdateRolesHandler', () =>
{
    let handler: IamUpdateRolesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateRolesHandler,
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

        handler     = module.get<IamUpdateRolesHandler>(IamUpdateRolesHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateRolesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateRolesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a roles updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await handler.main(<IamUpdateRolesInput>roles[0])).toBe(roles[0]);
        });
    });
});
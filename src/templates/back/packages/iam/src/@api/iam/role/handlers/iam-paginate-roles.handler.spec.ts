/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { IamPaginateRolesHandler } from './iam-paginate-roles.handler';

// sources
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

describe('IamPaginateRolesHandler', () =>
{
    let handler: IamPaginateRolesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateRolesHandler,
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

        handler = module.get<IamPaginateRolesHandler>(IamPaginateRolesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('IamPaginateRolesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateRolesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a roles', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: roles.length,
                count: roles.length,
                rows : roles,
            })));
            expect(await handler.main()).toEqual({
                total: roles.length,
                count: roles.length,
                rows : roles,
            });
        });
    });
});
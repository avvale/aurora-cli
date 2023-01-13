/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { IamUpdatePermissionsHandler } from './iam-update-permissions.handler';
import { IamUpdatePermissionsInput } from '@api/graphql';

// sources
import { permissions } from '@app/iam/permission/infrastructure/seeds/permission.seed';

describe('IamUpdatePermissionsHandler', () =>
{
    let handler: IamUpdatePermissionsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdatePermissionsHandler,
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

        handler     = module.get<IamUpdatePermissionsHandler>(IamUpdatePermissionsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdatePermissionsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a permissions updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await handler.main(<IamUpdatePermissionsInput>permissions[0])).toBe(permissions[0]);
        });
    });
});
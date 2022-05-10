/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamUpdatePermissionByIdHandler } from './iam-update-permission-by-id.handler';
import { IamUpdatePermissionByIdInput } from '../../../../graphql';

// sources
import { permissions } from '@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamUpdatePermissionByIdHandler', () =>
{
    let handler: IamUpdatePermissionByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdatePermissionByIdHandler,
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

        handler     = module.get<IamUpdatePermissionByIdHandler>(IamUpdatePermissionByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdatePermissionByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a permission updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await handler.main(<IamUpdatePermissionByIdInput>permissions[0])).toBe(permissions[0]);
        });
    });
});
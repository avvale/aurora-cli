/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamUpsertPermissionHandler } from './iam-upsert-permission.handler';

// sources
import { permissions } from '@app/iam/permission/infrastructure/mock/mock-permission.data';

describe('IamUpsertPermissionHandler', () =>
{
    let handler: IamUpsertPermissionHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertPermissionHandler,
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

        handler     = module.get<IamUpsertPermissionHandler>(IamUpsertPermissionHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamUpsertPermissionHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an permission upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await handler.main(permissions[0])).toBe(permissions[0]);
        });
    });
});
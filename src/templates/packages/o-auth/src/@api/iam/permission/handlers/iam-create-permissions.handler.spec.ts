import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreatePermissionsHandler } from './iam-create-permissions.handler';
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamCreatePermissionsHandler', () =>
{
    let handler: IamCreatePermissionsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreatePermissionsHandler,
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

        handler     = module.get<IamCreatePermissionsHandler>(IamCreatePermissionsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreatePermissionsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an permissions created', async () =>
        {
            expect(await handler.main(permissions)).toBe(true);
        });
    });
});
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamDeleteBoundedContextsHandler } from './iam-delete-bounded-contexts.handler';

// sources
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/mock/mock-bounded-context.data';

describe('IamDeleteBoundedContextsHandler', () =>
{
    let handler: IamDeleteBoundedContextsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteBoundedContextsHandler,
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

        handler    = module.get<IamDeleteBoundedContextsHandler>(IamDeleteBoundedContextsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamDeleteBoundedContextsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteBoundedContextsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an boundedContexts deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts)));
            expect(await handler.main()).toBe(boundedContexts);
        });
    });
});
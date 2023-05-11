/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamGetBoundedContextsHandler } from './iam-get-bounded-contexts.handler';

// sources
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/mock/mock-bounded-context.data';

describe('IamGetBoundedContextsHandler', () =>
{
    let handler: IamGetBoundedContextsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetBoundedContextsHandler,
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

        handler = module.get<IamGetBoundedContextsHandler>(IamGetBoundedContextsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('IamGetBoundedContextsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetBoundedContextsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a boundedContexts', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts)));
            expect(await handler.main()).toBe(boundedContexts);
        });
    });
});
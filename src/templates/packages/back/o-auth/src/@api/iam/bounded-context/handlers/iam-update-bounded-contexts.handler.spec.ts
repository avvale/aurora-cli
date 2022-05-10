/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamUpdateBoundedContextsHandler } from './iam-update-bounded-contexts.handler';
import { IamUpdateBoundedContextsInput } from '../../../../graphql';

// sources
import { boundedContexts } from '@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamUpdateBoundedContextsHandler', () =>
{
    let handler: IamUpdateBoundedContextsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateBoundedContextsHandler,
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

        handler     = module.get<IamUpdateBoundedContextsHandler>(IamUpdateBoundedContextsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateBoundedContextsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateBoundedContextsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a boundedContexts updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await handler.main(<IamUpdateBoundedContextsInput>boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});
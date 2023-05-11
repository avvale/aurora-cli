/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamUpdateBoundedContextByIdHandler } from './iam-update-bounded-context-by-id.handler';
import { IamUpdateBoundedContextByIdInput } from '@api/graphql';

// sources
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/mock/mock-bounded-context.data';

describe('IamUpdateBoundedContextByIdHandler', () =>
{
    let handler: IamUpdateBoundedContextByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateBoundedContextByIdHandler,
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

        handler     = module.get<IamUpdateBoundedContextByIdHandler>(IamUpdateBoundedContextByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateBoundedContextByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateBoundedContextByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a boundedContext updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await handler.main(<IamUpdateBoundedContextByIdInput>boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});
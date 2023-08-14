/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateBoundedContextHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateBoundedContextHandler', () =>
{
    let handler: IamCreateBoundedContextHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreateBoundedContextHandler,
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

        handler = module.get<IamCreateBoundedContextHandler>(IamCreateBoundedContextHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an boundedContext created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(
                await handler.main(
                    iamMockBoundedContextData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockBoundedContextData[0]);
        });
    });
});

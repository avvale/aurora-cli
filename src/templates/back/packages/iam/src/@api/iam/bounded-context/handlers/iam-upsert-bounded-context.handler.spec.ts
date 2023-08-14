/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpsertBoundedContextHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertBoundedContextHandler', () =>
{
    let handler: IamUpsertBoundedContextHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertBoundedContextHandler,
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

        handler = module.get<IamUpsertBoundedContextHandler>(IamUpsertBoundedContextHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamUpsertBoundedContextHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an boundedContext upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(
                await handler.main(
                    iamMockBoundedContextData[0],
                    'Europe/Madrid',
                ))
                .toBe(iamMockBoundedContextData[0]);
        });
    });
});

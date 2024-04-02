/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteTagsHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTagsHandler', () =>
{
    let handler: IamDeleteTagsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteTagsHandler,
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

        handler = module.get<IamDeleteTagsHandler>(IamDeleteTagsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamDeleteTagsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteTagsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an iamMockTagData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockTagData);
        });
    });
});

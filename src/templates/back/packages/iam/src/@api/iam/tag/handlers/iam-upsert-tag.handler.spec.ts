/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpsertTagHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTagHandler', () =>
{
    let handler: IamUpsertTagHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertTagHandler,
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

        handler = module.get<IamUpsertTagHandler>(IamUpsertTagHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamUpsertTagHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an tag upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData[0])));
            expect(
                await handler.main(
                    iamMockTagData[0],
                    'Europe/Madrid',
                ))
                .toBe(iamMockTagData[0]);
        });
    });
});

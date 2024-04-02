/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateTagsHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTagsHandler', () =>
{
    let handler: IamPaginateTagsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateTagsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamPaginateTagsHandler>(IamPaginateTagsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamPaginateTagsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateTagsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a tags', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: iamMockTagData.length,
                count: iamMockTagData.length,
                rows : iamMockTagData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: iamMockTagData.length,
                    count: iamMockTagData.length,
                    rows : iamMockTagData,
                });
        });
    });
});

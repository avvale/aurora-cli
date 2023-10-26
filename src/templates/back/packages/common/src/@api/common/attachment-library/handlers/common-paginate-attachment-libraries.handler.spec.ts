/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonPaginateAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentLibrariesHandler', () =>
{
    let handler: CommonPaginateAttachmentLibrariesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateAttachmentLibrariesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonPaginateAttachmentLibrariesHandler>(CommonPaginateAttachmentLibrariesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonPaginateAttachmentLibrariesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateAttachmentLibrariesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a attachmentLibraries', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: commonMockAttachmentLibraryData.length,
                count: commonMockAttachmentLibraryData.length,
                rows : commonMockAttachmentLibraryData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: commonMockAttachmentLibraryData.length,
                    count: commonMockAttachmentLibraryData.length,
                    rows : commonMockAttachmentLibraryData,
                });
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAttachmentLibraryHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentLibraryHandler', () =>
{
    let handler: CommonFindAttachmentLibraryHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAttachmentLibraryHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonFindAttachmentLibraryHandler>(CommonFindAttachmentLibraryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonFindAttachmentLibraryHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentLibraryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a attachmentLibrary', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAttachmentLibraryData[0]);
        });
    });
});

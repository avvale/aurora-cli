import { commonMockAttachmentLibraryData, CommonUpsertAttachmentLibraryCommand } from '@app/common/attachment-library';
import { CommonUpsertAttachmentLibraryCommandHandler } from '@app/common/attachment-library/application/upsert/common-upsert-attachment-library.command-handler';
import { CommonUpsertAttachmentLibraryService } from '@app/common/attachment-library/application/upsert/common-upsert-attachment-library.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAttachmentLibraryCommandHandler', () =>
{
    let commandHandler: CommonUpsertAttachmentLibraryCommandHandler;
    let service: CommonUpsertAttachmentLibraryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpsertAttachmentLibraryCommandHandler,
                {
                    provide : CommonUpsertAttachmentLibraryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpsertAttachmentLibraryCommandHandler>(CommonUpsertAttachmentLibraryCommandHandler);
        service = module.get<CommonUpsertAttachmentLibraryService>(CommonUpsertAttachmentLibraryService);
    });

    describe('main', () =>
    {
        test('UpsertAttachmentLibraryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the CommonUpsertAttachmentLibraryService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpsertAttachmentLibraryCommand(
                    {
                        id: commonMockAttachmentLibraryData[0].id,
                        filename: commonMockAttachmentLibraryData[0].filename,
                        originFilename: commonMockAttachmentLibraryData[0].originFilename,
                        mimetype: commonMockAttachmentLibraryData[0].mimetype,
                        extension: commonMockAttachmentLibraryData[0].extension,
                        relativePathSegments: commonMockAttachmentLibraryData[0].relativePathSegments,
                        width: commonMockAttachmentLibraryData[0].width,
                        height: commonMockAttachmentLibraryData[0].height,
                        size: commonMockAttachmentLibraryData[0].size,
                        url: commonMockAttachmentLibraryData[0].url,
                        meta: commonMockAttachmentLibraryData[0].meta,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

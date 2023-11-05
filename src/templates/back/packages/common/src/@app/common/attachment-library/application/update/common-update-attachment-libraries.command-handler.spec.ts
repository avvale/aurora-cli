import { commonMockAttachmentLibraryData, CommonUpdateAttachmentLibrariesCommand } from '@app/common/attachment-library';
import { CommonUpdateAttachmentLibrariesCommandHandler } from '@app/common/attachment-library/application/update/common-update-attachment-libraries.command-handler';
import { CommonUpdateAttachmentLibrariesService } from '@app/common/attachment-library/application/update/common-update-attachment-libraries.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibrariesCommandHandler', () =>
{
    let commandHandler: CommonUpdateAttachmentLibrariesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAttachmentLibrariesCommandHandler,
                {
                    provide : CommonUpdateAttachmentLibrariesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAttachmentLibrariesCommandHandler>(CommonUpdateAttachmentLibrariesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentLibrariesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachmentLibraries updated', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAttachmentLibrariesCommand(
                    {
                        id: commonMockAttachmentLibraryData[0].id,
                        filename: commonMockAttachmentLibraryData[0].filename,
                        mimetype: commonMockAttachmentLibraryData[0].mimetype,
                        extension: commonMockAttachmentLibraryData[0].extension,
                        relativePathSegments: commonMockAttachmentLibraryData[0].relativePathSegments,
                        width: commonMockAttachmentLibraryData[0].width,
                        height: commonMockAttachmentLibraryData[0].height,
                        size: commonMockAttachmentLibraryData[0].size,
                        url: commonMockAttachmentLibraryData[0].url,
                        meta: commonMockAttachmentLibraryData[0].meta,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

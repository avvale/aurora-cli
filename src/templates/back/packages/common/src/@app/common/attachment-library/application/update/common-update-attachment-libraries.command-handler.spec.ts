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
                        name: commonMockAttachmentLibraryData[0].name,
                        path: commonMockAttachmentLibraryData[0].path,
                        filename: commonMockAttachmentLibraryData[0].filename,
                        url: commonMockAttachmentLibraryData[0].url,
                        mime: commonMockAttachmentLibraryData[0].mime,
                        extension: commonMockAttachmentLibraryData[0].extension,
                        size: commonMockAttachmentLibraryData[0].size,
                        width: commonMockAttachmentLibraryData[0].width,
                        height: commonMockAttachmentLibraryData[0].height,
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

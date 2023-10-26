import { commonMockAttachmentLibraryData, CommonUpdateAttachmentLibraryByIdCommand } from '@app/common/attachment-library';
import { CommonUpdateAttachmentLibraryByIdCommandHandler } from '@app/common/attachment-library/application/update/common-update-attachment-library-by-id.command-handler';
import { CommonUpdateAttachmentLibraryByIdService } from '@app/common/attachment-library/application/update/common-update-attachment-library-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibraryByIdCommandHandler', () =>
{
    let commandHandler: CommonUpdateAttachmentLibraryByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAttachmentLibraryByIdCommandHandler,
                {
                    provide : CommonUpdateAttachmentLibraryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAttachmentLibraryByIdCommandHandler>(CommonUpdateAttachmentLibraryByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentLibraryByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachmentLibrary created', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAttachmentLibraryByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

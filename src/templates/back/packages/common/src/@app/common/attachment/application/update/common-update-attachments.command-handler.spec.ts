import { commonMockAttachmentData, CommonUpdateAttachmentsCommand } from '@app/common/attachment';
import { CommonUpdateAttachmentsCommandHandler } from '@app/common/attachment/application/update/common-update-attachments.command-handler';
import { CommonUpdateAttachmentsService } from '@app/common/attachment/application/update/common-update-attachments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentsCommandHandler', () =>
{
    let commandHandler: CommonUpdateAttachmentsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAttachmentsCommandHandler,
                {
                    provide : CommonUpdateAttachmentsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAttachmentsCommandHandler>(CommonUpdateAttachmentsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachments updated', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAttachmentsCommand(
                    {
                        id: commonMockAttachmentData[0].id,
                        familyId: commonMockAttachmentData[0].familyId,
                        attachableId: commonMockAttachmentData[0].attachableId,
                        sort: commonMockAttachmentData[0].sort,
                        alt: commonMockAttachmentData[0].alt,
                        title: commonMockAttachmentData[0].title,
                        originFilename: commonMockAttachmentData[0].originFilename,
                        filename: commonMockAttachmentData[0].filename,
                        mimetype: commonMockAttachmentData[0].mimetype,
                        extension: commonMockAttachmentData[0].extension,
                        relativePathSegments: commonMockAttachmentData[0].relativePathSegments,
                        width: commonMockAttachmentData[0].width,
                        height: commonMockAttachmentData[0].height,
                        size: commonMockAttachmentData[0].size,
                        url: commonMockAttachmentData[0].url,
                        isCropable: commonMockAttachmentData[0].isCropable,
                        libraryId: commonMockAttachmentData[0].libraryId,
                        libraryFilename: commonMockAttachmentData[0].libraryFilename,
                        sizes: commonMockAttachmentData[0].sizes,
                        meta: commonMockAttachmentData[0].meta,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

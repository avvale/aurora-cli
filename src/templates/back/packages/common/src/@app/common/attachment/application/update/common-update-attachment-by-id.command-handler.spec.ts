import { commonMockAttachmentData, CommonUpdateAttachmentByIdCommand } from '@app/common/attachment';
import { CommonUpdateAttachmentByIdCommandHandler } from '@app/common/attachment/application/update/common-update-attachment-by-id.command-handler';
import { CommonUpdateAttachmentByIdService } from '@app/common/attachment/application/update/common-update-attachment-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentByIdCommandHandler', () =>
{
    let commandHandler: CommonUpdateAttachmentByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAttachmentByIdCommandHandler,
                {
                    provide : CommonUpdateAttachmentByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAttachmentByIdCommandHandler>(CommonUpdateAttachmentByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachment created', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAttachmentByIdCommand(
                    {
                        id: commonMockAttachmentData[0].id,
                        familyId: commonMockAttachmentData[0].familyId,
                        attachableId: commonMockAttachmentData[0].attachableId,
                        langId: commonMockAttachmentData[0].langId,
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

import { commonMockAttachmentData, CommonUpsertAttachmentCommand } from '@app/common/attachment';
import { CommonUpsertAttachmentCommandHandler } from '@app/common/attachment/application/upsert/common-upsert-attachment.command-handler';
import { CommonUpsertAttachmentService } from '@app/common/attachment/application/upsert/common-upsert-attachment.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAttachmentCommandHandler', () =>
{
    let commandHandler: CommonUpsertAttachmentCommandHandler;
    let service: CommonUpsertAttachmentService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpsertAttachmentCommandHandler,
                {
                    provide : CommonUpsertAttachmentService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpsertAttachmentCommandHandler>(CommonUpsertAttachmentCommandHandler);
        service = module.get<CommonUpsertAttachmentService>(CommonUpsertAttachmentService);
    });

    describe('main', () =>
    {
        test('UpsertAttachmentCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the CommonUpsertAttachmentService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpsertAttachmentCommand(
                    {
                        id: commonMockAttachmentData[0].id,
                        familyId: commonMockAttachmentData[0].familyId,
                        attachableId: commonMockAttachmentData[0].attachableId,
                        sort: commonMockAttachmentData[0].sort,
                        alt: commonMockAttachmentData[0].alt,
                        title: commonMockAttachmentData[0].title,
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
                        meta: commonMockAttachmentData[0].meta,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

import { CommonCreateAttachmentCommandHandler } from './common-create-attachment.command-handler';
import { CommonCreateAttachmentService } from './common-create-attachment.service';
import { CommonCreateAttachmentCommand, commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentCommandHandler', () =>
{
    let commandHandler: CommonCreateAttachmentCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAttachmentCommandHandler,
                {
                    provide : CommonCreateAttachmentService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAttachmentCommandHandler>(CommonCreateAttachmentCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateAttachmentCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CommonCreateAttachmentService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAttachmentCommand(
                    {
                        id: commonMockAttachmentData[0].id,
                        familyId: commonMockAttachmentData[0].familyId,
                        sort: commonMockAttachmentData[0].sort,
                        alt: commonMockAttachmentData[0].alt,
                        title: commonMockAttachmentData[0].title,
                        path: commonMockAttachmentData[0].path,
                        filename: commonMockAttachmentData[0].filename,
                        url: commonMockAttachmentData[0].url,
                        mime: commonMockAttachmentData[0].mime,
                        extension: commonMockAttachmentData[0].extension,
                        size: commonMockAttachmentData[0].size,
                        width: commonMockAttachmentData[0].width,
                        height: commonMockAttachmentData[0].height,
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

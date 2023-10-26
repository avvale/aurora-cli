import { CommonCreateAttachmentLibraryCommandHandler } from './common-create-attachment-library.command-handler';
import { CommonCreateAttachmentLibraryService } from './common-create-attachment-library.service';
import { CommonCreateAttachmentLibraryCommand, commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentLibraryCommandHandler', () =>
{
    let commandHandler: CommonCreateAttachmentLibraryCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAttachmentLibraryCommandHandler,
                {
                    provide : CommonCreateAttachmentLibraryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAttachmentLibraryCommandHandler>(CommonCreateAttachmentLibraryCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateAttachmentLibraryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CommonCreateAttachmentLibraryService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAttachmentLibraryCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

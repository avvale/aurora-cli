import { CommonUpdateAttachmentLibrariesController, CommonUpdateAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibrariesController', () =>
{
    let controller: CommonUpdateAttachmentLibrariesController;
    let handler: CommonUpdateAttachmentLibrariesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateAttachmentLibrariesController,
            ],
            providers: [
                {
                    provide : CommonUpdateAttachmentLibrariesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateAttachmentLibrariesController>(CommonUpdateAttachmentLibrariesController);
        handler = module.get<CommonUpdateAttachmentLibrariesHandler>(CommonUpdateAttachmentLibrariesHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateAttachmentLibrariesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachmentLibraries updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData[0])));
            expect(await controller.main(commonMockAttachmentLibraryData[0])).toBe(commonMockAttachmentLibraryData[0]);
        });
    });
});

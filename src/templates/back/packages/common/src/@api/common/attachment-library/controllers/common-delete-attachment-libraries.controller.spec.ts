import { CommonDeleteAttachmentLibrariesController, CommonDeleteAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentLibrariesController', () =>
{
    let controller: CommonDeleteAttachmentLibrariesController;
    let handler: CommonDeleteAttachmentLibrariesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAttachmentLibrariesController,
            ],
            providers: [
                {
                    provide : CommonDeleteAttachmentLibrariesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAttachmentLibrariesController>(CommonDeleteAttachmentLibrariesController);
        handler = module.get<CommonDeleteAttachmentLibrariesHandler>(CommonDeleteAttachmentLibrariesHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentLibrariesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAttachmentLibraryData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData)));
            expect(await controller.main()).toBe(commonMockAttachmentLibraryData);
        });
    });
});

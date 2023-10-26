/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentLibraryByIdController, CommonDeleteAttachmentLibraryByIdHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentLibraryByIdController', () =>
{
    let controller: CommonDeleteAttachmentLibraryByIdController;
    let handler: CommonDeleteAttachmentLibraryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAttachmentLibraryByIdController,
            ],
            providers: [
                {
                    provide : CommonDeleteAttachmentLibraryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAttachmentLibraryByIdController>(CommonDeleteAttachmentLibraryByIdController);
        handler = module.get<CommonDeleteAttachmentLibraryByIdHandler>(CommonDeleteAttachmentLibraryByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentLibraryByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachmentLibrary deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData[0])));
            expect(await controller.main(commonMockAttachmentLibraryData[0].id)).toBe(commonMockAttachmentLibraryData[0]);
        });
    });
});

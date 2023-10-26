import { CommonPaginateAttachmentLibrariesController, CommonPaginateAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentLibrariesController', () =>
{
    let controller: CommonPaginateAttachmentLibrariesController;
    let handler: CommonPaginateAttachmentLibrariesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonPaginateAttachmentLibrariesController,
            ],
            providers: [
                {
                    provide : CommonPaginateAttachmentLibrariesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonPaginateAttachmentLibrariesController>(CommonPaginateAttachmentLibrariesController);
        handler = module.get<CommonPaginateAttachmentLibrariesHandler>(CommonPaginateAttachmentLibrariesHandler);
    });

    describe('main', () =>
    {
        test('CommonPaginateAttachmentLibrariesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a commonMockAttachmentLibraryData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : commonMockAttachmentLibraryData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : commonMockAttachmentLibraryData,
            });
        });
    });
});

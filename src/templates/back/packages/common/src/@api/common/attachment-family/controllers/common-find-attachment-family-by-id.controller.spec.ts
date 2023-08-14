import { CommonFindAttachmentFamilyByIdController, CommonFindAttachmentFamilyByIdHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentFamilyByIdController', () =>
{
    let controller: CommonFindAttachmentFamilyByIdController;
    let handler: CommonFindAttachmentFamilyByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindAttachmentFamilyByIdController,
            ],
            providers: [
                {
                    provide : CommonFindAttachmentFamilyByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindAttachmentFamilyByIdController>(CommonFindAttachmentFamilyByIdController);
        handler = module.get<CommonFindAttachmentFamilyByIdHandler>(CommonFindAttachmentFamilyByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentFamilyByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachmentFamily by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData[0])));
            expect(await controller.main(commonMockAttachmentFamilyData[0].id)).toBe(commonMockAttachmentFamilyData[0]);
        });
    });
});

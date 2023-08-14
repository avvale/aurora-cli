import { CommonUpdateAttachmentFamilyByIdController, CommonUpdateAttachmentFamilyByIdHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentFamilyByIdController', () =>
{
    let controller: CommonUpdateAttachmentFamilyByIdController;
    let handler: CommonUpdateAttachmentFamilyByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateAttachmentFamilyByIdController,
            ],
            providers: [
                {
                    provide : CommonUpdateAttachmentFamilyByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateAttachmentFamilyByIdController>(CommonUpdateAttachmentFamilyByIdController);
        handler = module.get<CommonUpdateAttachmentFamilyByIdHandler>(CommonUpdateAttachmentFamilyByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateAttachmentFamilyByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachmentFamily updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData[0])));
            expect(await controller.main(commonMockAttachmentFamilyData[0])).toBe(commonMockAttachmentFamilyData[0]);
        });
    });
});

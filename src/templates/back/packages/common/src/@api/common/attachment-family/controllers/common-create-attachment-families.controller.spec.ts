import { CommonCreateAttachmentFamiliesController, CommonCreateAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentFamiliesController', () =>
{
    let controller: CommonCreateAttachmentFamiliesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonCreateAttachmentFamiliesController,
            ],
            providers: [
                {
                    provide : CommonCreateAttachmentFamiliesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateAttachmentFamiliesController>(CommonCreateAttachmentFamiliesController);
    });

    describe('main', () =>
    {
        test('CommonCreateAttachmentFamiliesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAttachmentFamilyData created', async () =>
        {
            expect(
                await controller.main(
                    commonMockAttachmentFamilyData,
                ),
            )
                .toBe(undefined);
        });
    });
});

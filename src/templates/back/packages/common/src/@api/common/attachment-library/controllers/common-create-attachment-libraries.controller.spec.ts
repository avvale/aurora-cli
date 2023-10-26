import { CommonCreateAttachmentLibrariesController, CommonCreateAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentLibrariesController', () =>
{
    let controller: CommonCreateAttachmentLibrariesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonCreateAttachmentLibrariesController,
            ],
            providers: [
                {
                    provide : CommonCreateAttachmentLibrariesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateAttachmentLibrariesController>(CommonCreateAttachmentLibrariesController);
    });

    describe('main', () =>
    {
        test('CommonCreateAttachmentLibrariesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAttachmentLibraryData created', async () =>
        {
            expect(
                await controller.main(
                    commonMockAttachmentLibraryData,
                ),
            )
                .toBe(undefined);
        });
    });
});

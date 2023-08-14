import { CommonCreateAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentFamiliesHandler', () =>
{
    let handler: CommonCreateAttachmentFamiliesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAttachmentFamiliesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonCreateAttachmentFamiliesHandler>(CommonCreateAttachmentFamiliesHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateAttachmentFamiliesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an commonMockAttachmentFamilyData created', async () =>
        {
            expect(await handler.main(commonMockAttachmentFamilyData)).toBe(true);
        });
    });
});

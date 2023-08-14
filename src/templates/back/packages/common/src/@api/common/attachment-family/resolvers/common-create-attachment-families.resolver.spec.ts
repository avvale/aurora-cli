import { CommonCreateAttachmentFamiliesHandler, CommonCreateAttachmentFamiliesResolver } from '@api/common/attachment-family';
import { CommonCreateAttachmentFamilyInput } from '@api/graphql';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentFamiliesResolver', () =>
{
    let resolver: CommonCreateAttachmentFamiliesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAttachmentFamiliesResolver,
                {
                    provide : CommonCreateAttachmentFamiliesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateAttachmentFamiliesResolver>(CommonCreateAttachmentFamiliesResolver);
    });

    test('CommonCreateAttachmentFamiliesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateAttachmentFamiliesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentFamilies created', async () =>
        {
            expect(await resolver.main(<CommonCreateAttachmentFamilyInput[]>commonMockAttachmentFamilyData)).toBe(undefined);
        });
    });
});

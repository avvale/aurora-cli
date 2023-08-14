/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetAttachmentFamiliesHandler, CommonGetAttachmentFamiliesResolver } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentFamiliesResolver', () =>
{
    let resolver: CommonGetAttachmentFamiliesResolver;
    let handler: CommonGetAttachmentFamiliesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonGetAttachmentFamiliesResolver,
                {
                    provide : CommonGetAttachmentFamiliesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonGetAttachmentFamiliesResolver>(CommonGetAttachmentFamiliesResolver);
        handler = module.get<CommonGetAttachmentFamiliesHandler>(CommonGetAttachmentFamiliesHandler);
    });

    test('CommonGetAttachmentFamiliesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetAttachmentFamiliesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a commonMockAttachmentFamilyData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData)));
            expect(await resolver.main()).toBe(commonMockAttachmentFamilyData);
        });
    });
});

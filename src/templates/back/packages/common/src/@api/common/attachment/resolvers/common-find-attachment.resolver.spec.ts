/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAttachmentHandler, CommonFindAttachmentResolver } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentResolver', () =>
{
    let resolver: CommonFindAttachmentResolver;
    let handler: CommonFindAttachmentHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAttachmentResolver,
                {
                    provide : CommonFindAttachmentHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindAttachmentResolver>(CommonFindAttachmentResolver);
        handler = module.get<CommonFindAttachmentHandler>(CommonFindAttachmentHandler);
    });

    test('CommonFindAttachmentResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachment', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(await resolver.main()).toBe(commonMockAttachmentData[0]);
        });
    });
});

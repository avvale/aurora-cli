/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateAttachmentHandler, CommonCreateAttachmentResolver } from '@api/common/attachment';
import { CommonCreateAttachmentInput } from '@api/graphql';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentResolver', () =>
{
    let resolver: CommonCreateAttachmentResolver;
    let handler: CommonCreateAttachmentHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateAttachmentResolver,
                {
                    provide : CommonCreateAttachmentHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateAttachmentResolver>(CommonCreateAttachmentResolver);
        handler = module.get<CommonCreateAttachmentHandler>(CommonCreateAttachmentHandler);
    });

    test('CommonCreateAttachmentResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateAttachmentResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachment created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(await resolver.main(<CommonCreateAttachmentInput>commonMockAttachmentData[0])).toBe(commonMockAttachmentData[0]);
        });
    });
});

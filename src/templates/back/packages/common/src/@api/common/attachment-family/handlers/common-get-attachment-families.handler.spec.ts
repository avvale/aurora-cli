/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentFamiliesHandler', () =>
{
    let handler: CommonGetAttachmentFamiliesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonGetAttachmentFamiliesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonGetAttachmentFamiliesHandler>(CommonGetAttachmentFamiliesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonGetAttachmentFamiliesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetAttachmentFamiliesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a commonMockAttachmentFamilyData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAttachmentFamilyData);
        });
    });
});

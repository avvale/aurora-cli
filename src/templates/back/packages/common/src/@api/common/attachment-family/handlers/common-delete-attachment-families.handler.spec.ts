/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentFamiliesHandler', () =>
{
    let handler: CommonDeleteAttachmentFamiliesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAttachmentFamiliesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonDeleteAttachmentFamiliesHandler>(CommonDeleteAttachmentFamiliesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonDeleteAttachmentFamiliesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentFamiliesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an commonMockAttachmentFamilyData deleted', async () =>
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

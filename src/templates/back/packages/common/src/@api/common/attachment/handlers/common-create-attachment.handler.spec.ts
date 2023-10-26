/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateAttachmentHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentHandler', () =>
{
    let handler: CommonCreateAttachmentHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateAttachmentHandler,
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

        handler = module.get<CommonCreateAttachmentHandler>(CommonCreateAttachmentHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('CommonCreateAttachmentHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an attachment created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(
                await handler.main(
                    commonMockAttachmentData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAttachmentData[0]);
        });
    });
});

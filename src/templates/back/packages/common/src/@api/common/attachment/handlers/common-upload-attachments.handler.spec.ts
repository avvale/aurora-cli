/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUploadAttachmentsHandler } from './common-upload-attachments.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUploadAttachmentsHandler', () =>
{
    let handler: CommonUploadAttachmentsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUploadAttachmentsHandler,
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

        handler     = module.get<CommonUploadAttachmentsHandler>(CommonUploadAttachmentsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonUploadAttachmentsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});
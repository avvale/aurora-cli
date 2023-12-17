/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateBlobAttachmentHandler } from './common-create-blob-attachment.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateBlobAttachmentHandler', () =>
{
    let handler: CommonCreateBlobAttachmentHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateBlobAttachmentHandler,
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

        handler     = module.get<CommonCreateBlobAttachmentHandler>(CommonCreateBlobAttachmentHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateBlobAttachmentHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});
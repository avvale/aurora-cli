/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateMessageByIdInput } from '@api/graphql';
import { WhatsappUpdateMessageByIdHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateMessageByIdHandler', () =>
{
    let handler: WhatsappUpdateMessageByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappUpdateMessageByIdHandler,
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

        handler = module.get<WhatsappUpdateMessageByIdHandler>(WhatsappUpdateMessageByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('WhatsappUpdateMessageByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappUpdateMessageByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a message updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(
                await handler.main(
                    <WhatsappUpdateMessageByIdInput>whatsappMockMessageData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(whatsappMockMessageData[0]);
        });
    });
});

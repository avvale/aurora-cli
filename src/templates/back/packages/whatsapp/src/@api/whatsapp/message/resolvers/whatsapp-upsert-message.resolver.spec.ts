/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateMessageByIdInput } from '@api/graphql';
import { WhatsappUpsertMessageHandler, WhatsappUpsertMessageResolver } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpsertMessageResolver', () =>
{
    let resolver: WhatsappUpsertMessageResolver;
    let handler: WhatsappUpsertMessageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappUpsertMessageResolver,
                {
                    provide : WhatsappUpsertMessageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappUpsertMessageResolver>(WhatsappUpsertMessageResolver);
        handler = module.get<WhatsappUpsertMessageHandler>(WhatsappUpsertMessageHandler);
    });

    test('WhatsappUpsertMessageResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappUpsertMessageResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an message upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(await resolver.main(<WhatsappUpdateMessageByIdInput>whatsappMockMessageData[0])).toBe(whatsappMockMessageData[0]);
        });
    });
});

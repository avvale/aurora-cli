/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappGetMessagesHandler, WhatsappGetMessagesResolver } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetMessagesResolver', () =>
{
    let resolver: WhatsappGetMessagesResolver;
    let handler: WhatsappGetMessagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappGetMessagesResolver,
                {
                    provide : WhatsappGetMessagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappGetMessagesResolver>(WhatsappGetMessagesResolver);
        handler = module.get<WhatsappGetMessagesHandler>(WhatsappGetMessagesHandler);
    });

    test('WhatsappGetMessagesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappGetMessagesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a whatsappMockMessageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData)));
            expect(await resolver.main()).toBe(whatsappMockMessageData);
        });
    });
});

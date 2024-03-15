/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappCreateMessageInput } from '@api/graphql';
import { WhatsappCreateMessageHandler, WhatsappCreateMessageResolver } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateMessageResolver', () =>
{
    let resolver: WhatsappCreateMessageResolver;
    let handler: WhatsappCreateMessageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappCreateMessageResolver,
                {
                    provide : WhatsappCreateMessageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappCreateMessageResolver>(WhatsappCreateMessageResolver);
        handler = module.get<WhatsappCreateMessageHandler>(WhatsappCreateMessageHandler);
    });

    test('WhatsappCreateMessageResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappCreateMessageResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an message created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(await resolver.main(<WhatsappCreateMessageInput>whatsappMockMessageData[0])).toBe(whatsappMockMessageData[0]);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateMessageByIdInput } from '@api/graphql';
import { WhatsappUpdateMessageByIdHandler, WhatsappUpdateMessageByIdResolver } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateMessageByIdResolver', () =>
{
    let resolver: WhatsappUpdateMessageByIdResolver;
    let handler: WhatsappUpdateMessageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappUpdateMessageByIdResolver,
                {
                    provide : WhatsappUpdateMessageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappUpdateMessageByIdResolver>(WhatsappUpdateMessageByIdResolver);
        handler = module.get<WhatsappUpdateMessageByIdHandler>(WhatsappUpdateMessageByIdHandler);
    });

    test('WhatsappUpdateMessageByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappUpdateMessageByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a message by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(await resolver.main(<WhatsappUpdateMessageByIdInput>whatsappMockMessageData[0])).toBe(whatsappMockMessageData[0]);
        });
    });
});

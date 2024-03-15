/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappFindMessageByIdHandler, WhatsappFindMessageByIdResolver } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindMessageByIdResolver', () =>
{
    let resolver: WhatsappFindMessageByIdResolver;
    let handler: WhatsappFindMessageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappFindMessageByIdResolver,
                {
                    provide : WhatsappFindMessageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappFindMessageByIdResolver>(WhatsappFindMessageByIdResolver);
        handler = module.get<WhatsappFindMessageByIdHandler>(WhatsappFindMessageByIdHandler);
    });

    test('WhatsappFindMessageByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappFindMessageByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an message by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(await resolver.main(whatsappMockMessageData[0].id)).toBe(whatsappMockMessageData[0]);
        });
    });
});

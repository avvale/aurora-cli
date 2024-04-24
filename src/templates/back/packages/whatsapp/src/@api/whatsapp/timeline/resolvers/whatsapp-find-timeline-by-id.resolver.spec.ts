/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappFindTimelineByIdHandler, WhatsappFindTimelineByIdResolver } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindTimelineByIdResolver', () =>
{
    let resolver: WhatsappFindTimelineByIdResolver;
    let handler: WhatsappFindTimelineByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappFindTimelineByIdResolver,
                {
                    provide : WhatsappFindTimelineByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappFindTimelineByIdResolver>(WhatsappFindTimelineByIdResolver);
        handler = module.get<WhatsappFindTimelineByIdHandler>(WhatsappFindTimelineByIdHandler);
    });

    test('WhatsappFindTimelineByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappFindTimelineByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an timeline by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData[0])));
            expect(await resolver.main(whatsappMockTimelineData[0].id)).toBe(whatsappMockTimelineData[0]);
        });
    });
});

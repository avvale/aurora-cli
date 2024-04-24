/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappPaginateTimelinesHandler, WhatsappPaginateTimelinesResolver } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateTimelinesResolver', () =>
{
    let resolver: WhatsappPaginateTimelinesResolver;
    let handler: WhatsappPaginateTimelinesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappPaginateTimelinesResolver,
                {
                    provide : WhatsappPaginateTimelinesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappPaginateTimelinesResolver>(WhatsappPaginateTimelinesResolver);
        handler = module.get<WhatsappPaginateTimelinesHandler>(WhatsappPaginateTimelinesHandler);
    });

    test('WhatsappPaginateTimelinesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappPaginateTimelinesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a whatsappMockTimelineData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : whatsappMockTimelineData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : whatsappMockTimelineData,
            });
        });
    });
});

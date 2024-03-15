import { WhatsappCountMessageQuery, WhatsappIMessageRepository, WhatsappMockMessageRepository } from '@app/whatsapp/message';
import { WhatsappCountMessageQueryHandler } from '@app/whatsapp/message/application/count/whatsapp-count-message.query-handler';
import { WhatsappCountMessageService } from '@app/whatsapp/message/application/count/whatsapp-count-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCountMessageQueryHandler', () =>
{
    let queryHandler: WhatsappCountMessageQueryHandler;
    let service: WhatsappCountMessageService;
    let repository: WhatsappMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappCountMessageQueryHandler,
                {
                    provide : WhatsappIMessageRepository,
                    useClass: WhatsappMockMessageRepository,
                },
                {
                    provide : WhatsappCountMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappCountMessageQueryHandler>(WhatsappCountMessageQueryHandler);
        service = module.get<WhatsappCountMessageService>(WhatsappCountMessageService);
        repository = <WhatsappMockMessageRepository>module.get<WhatsappIMessageRepository>(WhatsappIMessageRepository);
    });

    describe('main', () =>
    {
        test('WhatsappCountMessageQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new WhatsappCountMessageQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});

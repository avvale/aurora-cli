import { WhatsappIConversationRepository, WhatsappMinConversationQuery, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappMinConversationQueryHandler } from '@app/whatsapp/conversation/application/min/whatsapp-min-conversation.query-handler';
import { WhatsappMinConversationService } from '@app/whatsapp/conversation/application/min/whatsapp-min-conversation.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMinConversationQueryHandler', () =>
{
    let queryHandler: WhatsappMinConversationQueryHandler;
    let service: WhatsappMinConversationService;
    let repository: WhatsappMockConversationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappMinConversationQueryHandler,
                {
                    provide : WhatsappIConversationRepository,
                    useClass: WhatsappMockConversationRepository,
                },
                {
                    provide : WhatsappMinConversationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappMinConversationQueryHandler>(WhatsappMinConversationQueryHandler);
        service = module.get<WhatsappMinConversationService>(WhatsappMinConversationService);
        repository = <WhatsappMockConversationRepository>module.get<WhatsappIConversationRepository>(WhatsappIConversationRepository);
    });

    describe('main', () =>
    {
        test('WhatsappMinConversationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new WhatsappMinConversationQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});

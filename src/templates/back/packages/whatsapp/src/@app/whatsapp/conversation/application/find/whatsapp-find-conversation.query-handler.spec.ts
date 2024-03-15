import { WhatsappConversationMapper, WhatsappFindConversationQuery, WhatsappIConversationRepository, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappFindConversationQueryHandler } from '@app/whatsapp/conversation/application/find/whatsapp-find-conversation.query-handler';
import { WhatsappFindConversationService } from '@app/whatsapp/conversation/application/find/whatsapp-find-conversation.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindConversationQueryHandler', () =>
{
    let queryHandler: WhatsappFindConversationQueryHandler;
    let service: WhatsappFindConversationService;
    let repository: WhatsappMockConversationRepository;
    let mapper: WhatsappConversationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappFindConversationQueryHandler,
                {
                    provide : WhatsappIConversationRepository,
                    useClass: WhatsappMockConversationRepository,
                },
                {
                    provide : WhatsappFindConversationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappFindConversationQueryHandler>(WhatsappFindConversationQueryHandler);
        service = module.get<WhatsappFindConversationService>(WhatsappFindConversationService);
        repository = <WhatsappMockConversationRepository>module.get<WhatsappIConversationRepository>(WhatsappIConversationRepository);
        mapper = new WhatsappConversationMapper();
    });

    describe('main', () =>
    {
        test('WhatsappFindConversationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an conversation founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new WhatsappFindConversationQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

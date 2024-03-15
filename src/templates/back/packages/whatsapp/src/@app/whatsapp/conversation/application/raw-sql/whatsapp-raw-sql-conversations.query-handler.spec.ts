import { WhatsappConversationMapper, WhatsappIConversationRepository, WhatsappMockConversationRepository, WhatsappRawSQLConversationsQuery } from '@app/whatsapp/conversation';
import { WhatsappRawSQLConversationsQueryHandler } from '@app/whatsapp/conversation/application/raw-sql/whatsapp-raw-sql-conversations.query-handler';
import { WhatsappRawSQLConversationsService } from '@app/whatsapp/conversation/application/raw-sql/whatsapp-raw-sql-conversations.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLConversationsQueryHandler', () =>
{
    let queryHandler: WhatsappRawSQLConversationsQueryHandler;
    let service: WhatsappRawSQLConversationsService;
    let repository: WhatsappMockConversationRepository;
    let mapper: WhatsappConversationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappRawSQLConversationsQueryHandler,
                {
                    provide : WhatsappIConversationRepository,
                    useClass: WhatsappMockConversationRepository,
                },
                {
                    provide : WhatsappRawSQLConversationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappRawSQLConversationsQueryHandler>(WhatsappRawSQLConversationsQueryHandler);
        service = module.get<WhatsappRawSQLConversationsService>(WhatsappRawSQLConversationsService);
        repository = <WhatsappMockConversationRepository>module.get<WhatsappIConversationRepository>(WhatsappIConversationRepository);
        mapper = new WhatsappConversationMapper();
    });

    describe('main', () =>
    {
        test('WhatsappRawSQLConversationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an conversations founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new WhatsappRawSQLConversationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});

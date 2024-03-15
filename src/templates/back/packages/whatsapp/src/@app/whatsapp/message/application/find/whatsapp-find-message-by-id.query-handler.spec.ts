import { WhatsappFindMessageByIdQuery, WhatsappIMessageRepository, WhatsappMessageMapper, whatsappMockMessageData, WhatsappMockMessageRepository } from '@app/whatsapp/message';
import { WhatsappFindMessageByIdQueryHandler } from '@app/whatsapp/message/application/find/whatsapp-find-message-by-id.query-handler';
import { WhatsappFindMessageByIdService } from '@app/whatsapp/message/application/find/whatsapp-find-message-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindMessageByIdQueryHandler', () =>
{
    let queryHandler: WhatsappFindMessageByIdQueryHandler;
    let service: WhatsappFindMessageByIdService;
    let repository: WhatsappMockMessageRepository;
    let mapper: WhatsappMessageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappFindMessageByIdQueryHandler,
                {
                    provide : WhatsappIMessageRepository,
                    useClass: WhatsappMockMessageRepository,
                },
                {
                    provide : WhatsappFindMessageByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappFindMessageByIdQueryHandler>(WhatsappFindMessageByIdQueryHandler);
        service = module.get<WhatsappFindMessageByIdService>(WhatsappFindMessageByIdService);
        repository = <WhatsappMockMessageRepository>module.get<WhatsappIMessageRepository>(WhatsappIMessageRepository);
        mapper = new WhatsappMessageMapper();
    });

    describe('main', () =>
    {
        test('FindMessageByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an message founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new WhatsappFindMessageByIdQuery(
                    whatsappMockMessageData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

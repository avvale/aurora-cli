import { WhatsappIMessageRepository, WhatsappMaxMessageQuery, WhatsappMockMessageRepository } from '@app/whatsapp/message';
import { WhatsappMaxMessageQueryHandler } from '@app/whatsapp/message/application/max/whatsapp-max-message.query-handler';
import { WhatsappMaxMessageService } from '@app/whatsapp/message/application/max/whatsapp-max-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMaxMessageQueryHandler', () =>
{
    let queryHandler: WhatsappMaxMessageQueryHandler;
    let service: WhatsappMaxMessageService;
    let repository: WhatsappMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappMaxMessageQueryHandler,
                {
                    provide : WhatsappIMessageRepository,
                    useClass: WhatsappMockMessageRepository,
                },
                {
                    provide : WhatsappMaxMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappMaxMessageQueryHandler>(WhatsappMaxMessageQueryHandler);
        service = module.get<WhatsappMaxMessageService>(WhatsappMaxMessageService);
        repository = <WhatsappMockMessageRepository>module.get<WhatsappIMessageRepository>(WhatsappIMessageRepository);
    });

    describe('main', () =>
    {
        test('WhatsappMaxMessageQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new WhatsappMaxMessageQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});

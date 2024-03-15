import { WhatsappIMessageRepository, WhatsappMinMessageQuery, WhatsappMockMessageRepository } from '@app/whatsapp/message';
import { WhatsappMinMessageQueryHandler } from '@app/whatsapp/message/application/min/whatsapp-min-message.query-handler';
import { WhatsappMinMessageService } from '@app/whatsapp/message/application/min/whatsapp-min-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMinMessageQueryHandler', () =>
{
    let queryHandler: WhatsappMinMessageQueryHandler;
    let service: WhatsappMinMessageService;
    let repository: WhatsappMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappMinMessageQueryHandler,
                {
                    provide : WhatsappIMessageRepository,
                    useClass: WhatsappMockMessageRepository,
                },
                {
                    provide : WhatsappMinMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappMinMessageQueryHandler>(WhatsappMinMessageQueryHandler);
        service = module.get<WhatsappMinMessageService>(WhatsappMinMessageService);
        repository = <WhatsappMockMessageRepository>module.get<WhatsappIMessageRepository>(WhatsappIMessageRepository);
    });

    describe('main', () =>
    {
        test('WhatsappMinMessageQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new WhatsappMinMessageQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});

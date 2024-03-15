import { WhatsappIMessageRepository, WhatsappMockMessageRepository, WhatsappSumMessageQuery } from '@app/whatsapp/message';
import { WhatsappSumMessageQueryHandler } from '@app/whatsapp/message/application/sum/whatsapp-sum-message.query-handler';
import { WhatsappSumMessageService } from '@app/whatsapp/message/application/sum/whatsapp-sum-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappSumMessageQueryHandler', () =>
{
    let queryHandler: WhatsappSumMessageQueryHandler;
    let service: WhatsappSumMessageService;
    let repository: WhatsappMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappSumMessageQueryHandler,
                {
                    provide : WhatsappIMessageRepository,
                    useClass: WhatsappMockMessageRepository,
                },
                {
                    provide : WhatsappSumMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappSumMessageQueryHandler>(WhatsappSumMessageQueryHandler);
        service = module.get<WhatsappSumMessageService>(WhatsappSumMessageService);
        repository = <WhatsappMockMessageRepository>module.get<WhatsappIMessageRepository>(WhatsappIMessageRepository);
    });

    describe('main', () =>
    {
        test('WhatsappSumMessageQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new WhatsappSumMessageQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});

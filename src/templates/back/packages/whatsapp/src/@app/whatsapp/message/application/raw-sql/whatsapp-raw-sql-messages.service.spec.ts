import { WhatsappIMessageRepository, WhatsappMockMessageRepository } from '@app/whatsapp/message';
import { WhatsappRawSQLMessagesService } from '@app/whatsapp/message/application/raw-sql/whatsapp-raw-sql-messages.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappRawSQLMessagesService ', () =>
{
    let service: WhatsappRawSQLMessagesService ;
    let repository: WhatsappIMessageRepository;
    let mockRepository: WhatsappMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappRawSQLMessagesService ,
                WhatsappMockMessageRepository,
                {
                    provide : WhatsappIMessageRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(WhatsappRawSQLMessagesService );
        repository      = module.get(WhatsappIMessageRepository);
        mockRepository  = module.get(WhatsappMockMessageRepository);
    });

    describe('main', () =>
    {
        test('RawSQLMessagesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get messages', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});

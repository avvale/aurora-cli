import { MessageIInboxSettingRepository, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageCountInboxSettingService } from '@app/message/inbox-setting/application/count/message-count-inbox-setting.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCountInboxSettingService', () =>
{
    let service: MessageCountInboxSettingService;
    let repository: MessageIInboxSettingRepository;
    let mockRepository: MessageMockInboxSettingRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageCountInboxSettingService,
                MessageMockInboxSettingRepository,
                {
                    provide : MessageIInboxSettingRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageCountInboxSettingService);
        repository = module.get(MessageIInboxSettingRepository);
        mockRepository = module.get(MessageMockInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('MessageCountInboxSettingService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () =>
        {
            jest.spyOn(repository, 'count').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource.length)));
            expect(await service.main()).toBe(mockRepository.collectionSource.length);
        });
    });
});

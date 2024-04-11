import { MessageIInboxSettingRepository, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageMaxInboxSettingService } from '@app/message/inbox-setting/application/max/message-max-inbox-setting.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMaxInboxSettingService', () =>
{
    let service: MessageMaxInboxSettingService;
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
                MessageMaxInboxSettingService,
                MessageMockInboxSettingRepository,
                {
                    provide : MessageIInboxSettingRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageMaxInboxSettingService);
        repository = module.get(MessageIInboxSettingRepository);
        mockRepository = module.get(MessageMockInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('MessageMaxInboxSettingService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(repository, 'max').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.max(column))));
            expect(await service.main('id')).toBe(mockRepository.max('id'));
        });
    });
});

import { MessageIInboxSettingRepository, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageMinInboxSettingService } from '@app/message/inbox-setting/application/min/message-min-inbox-setting.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMinInboxSettingService', () =>
{
    let service: MessageMinInboxSettingService;
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
                MessageMinInboxSettingService,
                MessageMockInboxSettingRepository,
                {
                    provide : MessageIInboxSettingRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageMinInboxSettingService);
        repository = module.get(MessageIInboxSettingRepository);
        mockRepository = module.get(MessageMockInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('MessageMinInboxSettingService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(repository, 'min').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.min(column))));
            expect(await service.main('id')).toBe(mockRepository.min('id'));
        });
    });
});

import { MessageIInboxSettingRepository, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageSumInboxSettingService } from '@app/message/inbox-setting/application/sum/message-sum-inbox-setting.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageSumInboxSettingService', () =>
{
    let service: MessageSumInboxSettingService;
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
                MessageSumInboxSettingService,
                MessageMockInboxSettingRepository,
                {
                    provide : MessageIInboxSettingRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageSumInboxSettingService);
        repository = module.get(MessageIInboxSettingRepository);
        mockRepository = module.get(MessageMockInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('MessageSumInboxSettingService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(repository, 'sum').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.sum(column))));
            expect(await service.main('id')).toBe(mockRepository.sum('id'));
        });
    });
});

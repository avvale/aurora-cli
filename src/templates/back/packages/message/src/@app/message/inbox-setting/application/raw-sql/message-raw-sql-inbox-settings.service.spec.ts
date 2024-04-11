import { MessageIInboxSettingRepository, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageRawSQLInboxSettingsService } from '@app/message/inbox-setting/application/raw-sql/message-raw-sql-inbox-settings.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageRawSQLInboxSettingsService ', () =>
{
    let service: MessageRawSQLInboxSettingsService ;
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
                MessageRawSQLInboxSettingsService ,
                MessageMockInboxSettingRepository,
                {
                    provide : MessageIInboxSettingRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(MessageRawSQLInboxSettingsService );
        repository      = module.get(MessageIInboxSettingRepository);
        mockRepository  = module.get(MessageMockInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('RawSQLInboxSettingsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get inboxSettings', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});

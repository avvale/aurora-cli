/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIInboxSettingRepository, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageCreateInboxSettingsService } from '@app/message/inbox-setting/application/create/message-create-inbox-settings.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxSettingsService', () =>
{
    let service: MessageCreateInboxSettingsService;
    let mockRepository: MessageMockInboxSettingRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageCreateInboxSettingsService,
                MessageMockInboxSettingRepository,
                {
                    provide : MessageIInboxSettingRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageCreateInboxSettingsService);
        mockRepository = module.get(MessageMockInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('CreateInboxSettingsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create inboxSettings and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});

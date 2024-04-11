/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIInboxSettingRepository, messageMockInboxSettingData, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageUpsertInboxSettingService } from '@app/message/inbox-setting/application/upsert/message-upsert-inbox-setting.service';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingId,
    MessageInboxSettingSort,
} from '@app/message/inbox-setting/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertInboxSettingService', () =>

{
    let service: MessageUpsertInboxSettingService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageUpsertInboxSettingService,
                MessageMockInboxSettingRepository,
                {
                    provide : MessageIInboxSettingRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageUpsertInboxSettingService);
    });

    describe('main', () =>
    {
        test('MessageUpsertInboxSettingService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a inboxSetting and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new MessageInboxSettingId(messageMockInboxSettingData[0].id),
                        accountId: new MessageInboxSettingAccountId(messageMockInboxSettingData[0].accountId),
                        sort: new MessageInboxSettingSort(messageMockInboxSettingData[0].sort),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});

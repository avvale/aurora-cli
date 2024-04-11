/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIInboxSettingRepository, messageMockInboxSettingData, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageUpdateInboxSettingsService } from '@app/message/inbox-setting/application/update/message-update-inbox-settings.service';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingId,
    MessageInboxSettingSort,
} from '@app/message/inbox-setting/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxSettingsService', () =>
{
    let service: MessageUpdateInboxSettingsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageUpdateInboxSettingsService,
                MessageMockInboxSettingRepository,
                {
                    provide : MessageIInboxSettingRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageUpdateInboxSettingsService);
    });

    describe('main', () =>
    {
        test('UpdateInboxSettingsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a inboxSettings and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new MessageInboxSettingId(messageMockInboxSettingData[0].id),
                        accountId: new MessageInboxSettingAccountId(messageMockInboxSettingData[0].accountId),
                        sort: new MessageInboxSettingSort(messageMockInboxSettingData[0].sort),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

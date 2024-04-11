/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIInboxSettingRepository, messageMockInboxSettingData, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageUpdateAndIncrementInboxSettingsService } from '@app/message/inbox-setting/application/update/message-update-and-increment-inbox-settings.service';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingId,
    MessageInboxSettingSort,
} from '@app/message/inbox-setting/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateAndIncrementInboxSettingsService', () =>
{
    let service: MessageUpdateAndIncrementInboxSettingsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageUpdateAndIncrementInboxSettingsService,
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

        service = module.get(MessageUpdateAndIncrementInboxSettingsService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementInboxSettingsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a inboxSettings and emit event', async () =>
        {
            /* eslint-disable key-spacing */
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
            /* eslint-enable key-spacing */
        });
    });
});

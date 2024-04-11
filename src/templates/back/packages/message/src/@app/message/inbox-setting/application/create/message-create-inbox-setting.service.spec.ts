/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIInboxSettingRepository, messageMockInboxSettingData, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageCreateInboxSettingService } from '@app/message/inbox-setting/application/create/message-create-inbox-setting.service';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingId,
    MessageInboxSettingSort,
} from '@app/message/inbox-setting/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxSettingService', () =>

{
    let service: MessageCreateInboxSettingService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageCreateInboxSettingService,
                MessageMockInboxSettingRepository,
                {
                    provide : MessageIInboxSettingRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageCreateInboxSettingService);
    });

    describe('main', () =>
    {
        test('MessageCreateInboxSettingService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a inboxSetting and emit event', async () =>
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

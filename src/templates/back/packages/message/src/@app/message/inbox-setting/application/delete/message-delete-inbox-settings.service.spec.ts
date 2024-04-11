/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIInboxSettingRepository, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageDeleteInboxSettingsService } from '@app/message/inbox-setting/application/delete/message-delete-inbox-settings.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxSettingsService', () =>
{
    let service: MessageDeleteInboxSettingsService;
    let repository: MessageIInboxSettingRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageDeleteInboxSettingsService,
                MessageMockInboxSettingRepository,
                {
                    provide : MessageIInboxSettingRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageDeleteInboxSettingsService);
        repository = module.get(MessageIInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('MessageDeleteInboxSettingsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete inboxSetting and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageIInboxSettingRepository,
    messageMockInboxSettingData,
    MessageMockInboxSettingRepository,
} from '@app/message/inbox-setting';
import { MessageDeleteInboxSettingByIdService } from '@app/message/inbox-setting/application/delete/message-delete-inbox-setting-by-id.service';
import { MessageInboxSettingId } from '@app/message/inbox-setting/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxSettingByIdService', () => {
    let service: MessageDeleteInboxSettingByIdService;
    let repository: MessageIInboxSettingRepository;
    let mockRepository: MessageMockInboxSettingRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageDeleteInboxSettingByIdService,
                MessageMockInboxSettingRepository,
                {
                    provide: MessageIInboxSettingRepository,
                    useValue: {
                        deleteById: (id) => {
                            /**/
                        },
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(MessageDeleteInboxSettingByIdService);
        repository = module.get(MessageIInboxSettingRepository);
        mockRepository = module.get(MessageMockInboxSettingRepository);
    });

    describe('main', () => {
        test('MessageDeleteInboxSettingByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete inboxSetting and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new MessageInboxSettingId(
                        messageMockInboxSettingData[0].id,
                    ),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

import {
  MessageIInboxSettingRepository,
  messageMockInboxSettingData,
  MessageMockInboxSettingRepository,
} from '@app/message/inbox-setting';
import { MessageFindInboxSettingByIdService } from '@app/message/inbox-setting/application/find/message-find-inbox-setting-by-id.service';
import { MessageInboxSettingId } from '@app/message/inbox-setting/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxSettingByIdService', () => {
  let service: MessageFindInboxSettingByIdService;
  let repository: MessageIInboxSettingRepository;
  let mockRepository: MessageMockInboxSettingRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageFindInboxSettingByIdService,
        MessageMockInboxSettingRepository,
        {
          provide: MessageIInboxSettingRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageFindInboxSettingByIdService);
    repository = module.get(MessageIInboxSettingRepository);
    mockRepository = module.get(MessageMockInboxSettingRepository);
  });

  describe('main', () => {
    test('FindInboxSettingByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find inboxSetting by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new MessageInboxSettingId(messageMockInboxSettingData[0].id),
        ),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});

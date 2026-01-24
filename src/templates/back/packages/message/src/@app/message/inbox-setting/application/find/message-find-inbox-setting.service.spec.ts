import {
  MessageIInboxSettingRepository,
  MessageMockInboxSettingRepository,
} from '@app/message/inbox-setting';
import { MessageFindInboxSettingService } from '@app/message/inbox-setting/application/find/message-find-inbox-setting.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxSettingService', () => {
  let service: MessageFindInboxSettingService;
  let repository: MessageIInboxSettingRepository;
  let mockRepository: MessageMockInboxSettingRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageFindInboxSettingService,
        MessageMockInboxSettingRepository,
        {
          provide: MessageIInboxSettingRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageFindInboxSettingService);
    repository = module.get(MessageIInboxSettingRepository);
    mockRepository = module.get(MessageMockInboxSettingRepository);
  });

  describe('main', () => {
    test('MessageFindInboxSettingService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find inboxSetting', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource[0]);
    });
  });
});

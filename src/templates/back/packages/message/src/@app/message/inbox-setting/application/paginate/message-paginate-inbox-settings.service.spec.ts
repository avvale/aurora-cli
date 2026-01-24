import {
  MessageIInboxSettingRepository,
  MessageMockInboxSettingRepository,
} from '@app/message/inbox-setting';
import { MessagePaginateInboxSettingsService } from '@app/message/inbox-setting/application/paginate/message-paginate-inbox-settings.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateInboxSettingsService', () => {
  let service: MessagePaginateInboxSettingsService;
  let repository: MessageIInboxSettingRepository;
  let mockRepository: MessageMockInboxSettingRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessagePaginateInboxSettingsService,
        MessageMockInboxSettingRepository,
        {
          provide: MessageIInboxSettingRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessagePaginateInboxSettingsService);
    repository = module.get(MessageIInboxSettingRepository);
    mockRepository = module.get(MessageMockInboxSettingRepository);
  });

  describe('main', () => {
    test('MessagePaginateInboxSettingsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate inboxSettings', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});

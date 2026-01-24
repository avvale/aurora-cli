import {
  MessageIOutboxRepository,
  MessageMockOutboxRepository,
} from '@app/message/outbox';
import { MessagePaginateOutboxesService } from '@app/message/outbox/application/paginate/message-paginate-outboxes.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateOutboxesService', () => {
  let service: MessagePaginateOutboxesService;
  let repository: MessageIOutboxRepository;
  let mockRepository: MessageMockOutboxRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessagePaginateOutboxesService,
        MessageMockOutboxRepository,
        {
          provide: MessageIOutboxRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessagePaginateOutboxesService);
    repository = module.get(MessageIOutboxRepository);
    mockRepository = module.get(MessageMockOutboxRepository);
  });

  describe('main', () => {
    test('MessagePaginateOutboxesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate outboxes', async () => {
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

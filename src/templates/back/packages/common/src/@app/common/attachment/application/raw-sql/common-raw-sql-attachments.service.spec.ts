import {
  CommonIAttachmentRepository,
  CommonMockAttachmentRepository,
} from '@app/common/attachment';
import { CommonRawSQLAttachmentsService } from '@app/common/attachment/application/raw-sql/common-raw-sql-attachments.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonRawSQLAttachmentsService ', () => {
  let service: CommonRawSQLAttachmentsService;
  let repository: CommonIAttachmentRepository;
  let mockRepository: CommonMockAttachmentRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonRawSQLAttachmentsService,
        CommonMockAttachmentRepository,
        {
          provide: CommonIAttachmentRepository,
          useValue: {
            rawSQL: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonRawSQLAttachmentsService);
    repository = module.get(CommonIAttachmentRepository);
    mockRepository = module.get(CommonMockAttachmentRepository);
  });

  describe('main', () => {
    test('RawSQLAttachmentsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get attachments', async () => {
      jest
        .spyOn(repository, 'rawSQL')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});

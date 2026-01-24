import {
  CommonIAttachmentRepository,
  CommonMockAttachmentRepository,
} from '@app/common/attachment';
import { CommonGetAttachmentsService } from '@app/common/attachment/application/get/common-get-attachments.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentsService', () => {
  let service: CommonGetAttachmentsService;
  let repository: CommonIAttachmentRepository;
  let mockRepository: CommonMockAttachmentRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonGetAttachmentsService,
        CommonMockAttachmentRepository,
        {
          provide: CommonIAttachmentRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonGetAttachmentsService);
    repository = module.get(CommonIAttachmentRepository);
    mockRepository = module.get(CommonMockAttachmentRepository);
  });

  describe('main', () => {
    test('GetAttachmentsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get attachments', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});

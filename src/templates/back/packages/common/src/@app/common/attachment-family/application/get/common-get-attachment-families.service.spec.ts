import {
  CommonIAttachmentFamilyRepository,
  CommonMockAttachmentFamilyRepository,
} from '@app/common/attachment-family';
import { CommonGetAttachmentFamiliesService } from '@app/common/attachment-family/application/get/common-get-attachment-families.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentFamiliesService', () => {
  let service: CommonGetAttachmentFamiliesService;
  let repository: CommonIAttachmentFamilyRepository;
  let mockRepository: CommonMockAttachmentFamilyRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonGetAttachmentFamiliesService,
        CommonMockAttachmentFamilyRepository,
        {
          provide: CommonIAttachmentFamilyRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonGetAttachmentFamiliesService);
    repository = module.get(CommonIAttachmentFamilyRepository);
    mockRepository = module.get(CommonMockAttachmentFamilyRepository);
  });

  describe('main', () => {
    test('GetAttachmentFamiliesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get attachmentFamilies', async () => {
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

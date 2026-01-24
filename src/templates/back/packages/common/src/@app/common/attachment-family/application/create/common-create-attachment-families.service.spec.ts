/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAttachmentFamilyRepository,
  CommonMockAttachmentFamilyRepository,
} from '@app/common/attachment-family';
import { CommonCreateAttachmentFamiliesService } from '@app/common/attachment-family/application/create/common-create-attachment-families.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentFamiliesService', () => {
  let service: CommonCreateAttachmentFamiliesService;
  let mockRepository: CommonMockAttachmentFamilyRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonCreateAttachmentFamiliesService,
        CommonMockAttachmentFamilyRepository,
        {
          provide: CommonIAttachmentFamilyRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonCreateAttachmentFamiliesService);
    mockRepository = module.get(CommonMockAttachmentFamilyRepository);
  });

  describe('main', () => {
    test('CreateAttachmentFamiliesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create attachmentFamilies and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});

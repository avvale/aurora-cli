import {
  CommonIAttachmentRepository,
  commonMockAttachmentData,
  CommonMockAttachmentRepository,
} from '@app/common/attachment';
import { CommonFindAttachmentByIdService } from '@app/common/attachment/application/find/common-find-attachment-by-id.service';
import { CommonAttachmentId } from '@app/common/attachment/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentByIdService', () => {
  let service: CommonFindAttachmentByIdService;
  let repository: CommonIAttachmentRepository;
  let mockRepository: CommonMockAttachmentRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindAttachmentByIdService,
        CommonMockAttachmentRepository,
        {
          provide: CommonIAttachmentRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindAttachmentByIdService);
    repository = module.get(CommonIAttachmentRepository);
    mockRepository = module.get(CommonMockAttachmentRepository);
  });

  describe('main', () => {
    test('FindAttachmentByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find attachment by id', async () => {
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
          new CommonAttachmentId(commonMockAttachmentData[0].id),
        ),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});

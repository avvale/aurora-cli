import {
  CommonIAttachmentFamilyRepository,
  CommonMockAttachmentFamilyRepository,
} from '@app/common/attachment-family';
import { CommonPaginateAttachmentFamiliesService } from '@app/common/attachment-family/application/paginate/common-paginate-attachment-families.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentFamiliesService', () => {
  let service: CommonPaginateAttachmentFamiliesService;
  let repository: CommonIAttachmentFamilyRepository;
  let mockRepository: CommonMockAttachmentFamilyRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonPaginateAttachmentFamiliesService,
        CommonMockAttachmentFamilyRepository,
        {
          provide: CommonIAttachmentFamilyRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonPaginateAttachmentFamiliesService);
    repository = module.get(CommonIAttachmentFamilyRepository);
    mockRepository = module.get(CommonMockAttachmentFamilyRepository);
  });

  describe('main', () => {
    test('CommonPaginateAttachmentFamiliesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate attachmentFamilies', async () => {
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

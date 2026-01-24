/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAttachmentFamilyRepository,
  commonMockAttachmentFamilyData,
  CommonMockAttachmentFamilyRepository,
} from '@app/common/attachment-family';
import { CommonDeleteAttachmentFamilyByIdService } from '@app/common/attachment-family/application/delete/common-delete-attachment-family-by-id.service';
import { CommonAttachmentFamilyId } from '@app/common/attachment-family/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentFamilyByIdService', () => {
  let service: CommonDeleteAttachmentFamilyByIdService;
  let repository: CommonIAttachmentFamilyRepository;
  let mockRepository: CommonMockAttachmentFamilyRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonDeleteAttachmentFamilyByIdService,
        CommonMockAttachmentFamilyRepository,
        {
          provide: CommonIAttachmentFamilyRepository,
          useValue: {
            deleteById: (id) => {
              /**/
            },
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonDeleteAttachmentFamilyByIdService);
    repository = module.get(CommonIAttachmentFamilyRepository);
    mockRepository = module.get(CommonMockAttachmentFamilyRepository);
  });

  describe('main', () => {
    test('CommonDeleteAttachmentFamilyByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete attachmentFamily and emit event', async () => {
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
          new CommonAttachmentFamilyId(commonMockAttachmentFamilyData[0].id),
          {},
        ),
      ).toBe(undefined);
    });
  });
});

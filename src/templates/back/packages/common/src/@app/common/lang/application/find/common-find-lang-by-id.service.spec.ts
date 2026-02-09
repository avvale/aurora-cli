/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonILangRepository,
  commonMockLangData,
  CommonMockLangRepository,
} from '@app/common/lang';
import { CommonFindLangByIdService } from '@app/common/lang/application/find/common-find-lang-by-id.service';
import { CommonLangId } from '@app/common/lang/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindLangByIdService', () => {
  let service: CommonFindLangByIdService;
  let repository: CommonILangRepository;
  let mockRepository: CommonMockLangRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindLangByIdService,
        CommonMockLangRepository,
        {
          provide: CommonILangRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindLangByIdService);
    repository = module.get(CommonILangRepository);
    mockRepository = module.get(CommonMockLangRepository);
  });

  describe('main', () => {
    test('FindLangByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find lang by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new CommonLangId(commonMockLangData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});

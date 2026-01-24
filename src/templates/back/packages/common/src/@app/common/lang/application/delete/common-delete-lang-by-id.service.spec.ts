/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonILangRepository,
  commonMockLangData,
  CommonMockLangRepository,
} from '@app/common/lang';
import { CommonDeleteLangByIdService } from '@app/common/lang/application/delete/common-delete-lang-by-id.service';
import { CommonLangId } from '@app/common/lang/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteLangByIdService', () => {
  let service: CommonDeleteLangByIdService;
  let repository: CommonILangRepository;
  let mockRepository: CommonMockLangRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonDeleteLangByIdService,
        CommonMockLangRepository,
        {
          provide: CommonILangRepository,
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

    service = module.get(CommonDeleteLangByIdService);
    repository = module.get(CommonILangRepository);
    mockRepository = module.get(CommonMockLangRepository);
  });

  describe('main', () => {
    test('CommonDeleteLangByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete lang and emit event', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new CommonLangId(commonMockLangData[0].id), {}),
      ).toBe(undefined);
    });
  });
});

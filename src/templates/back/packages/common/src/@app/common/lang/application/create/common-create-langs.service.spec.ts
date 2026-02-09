/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonILangRepository,
  CommonMockLangRepository,
} from '@app/common/lang';
import { CommonCreateLangsService } from '@app/common/lang/application/create/common-create-langs.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateLangsService', () => {
  let service: CommonCreateLangsService;
  let mockRepository: CommonMockLangRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonCreateLangsService,
        CommonMockLangRepository,
        {
          provide: CommonILangRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonCreateLangsService);
    mockRepository = module.get(CommonMockLangRepository);
  });

  describe('main', () => {
    test('CreateLangsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create langs and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});

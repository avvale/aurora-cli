/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonILangRepository,
  CommonMockLangRepository,
} from '@app/common/lang';
import { CommonDeleteLangsService } from '@app/common/lang/application/delete/common-delete-langs.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteLangsService', () => {
  let service: CommonDeleteLangsService;
  let repository: CommonILangRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonDeleteLangsService,
        CommonMockLangRepository,
        {
          provide: CommonILangRepository,
          useValue: {
            get: () => {
              /**/
            },
            delete: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonDeleteLangsService);
    repository = module.get(CommonILangRepository);
  });

  describe('main', () => {
    test('CommonDeleteLangsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete lang and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});

import {
  CommonGetLangsQuery,
  CommonILangRepository,
  CommonLangMapper,
  CommonMockLangRepository,
} from '@app/common/lang';
import { CommonGetLangsQueryHandler } from '@app/common/lang/application/get/common-get-langs.query-handler';
import { CommonGetLangsService } from '@app/common/lang/application/get/common-get-langs.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetLangsQueryHandler', () => {
  let queryHandler: CommonGetLangsQueryHandler;
  let service: CommonGetLangsService;
  let repository: CommonMockLangRepository;
  let mapper: CommonLangMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonGetLangsQueryHandler,
        {
          provide: CommonILangRepository,
          useClass: CommonMockLangRepository,
        },
        {
          provide: CommonGetLangsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonGetLangsQueryHandler>(
      CommonGetLangsQueryHandler,
    );
    service = module.get<CommonGetLangsService>(CommonGetLangsService);
    repository = <CommonMockLangRepository>(
      module.get<CommonILangRepository>(CommonILangRepository)
    );
    mapper = new CommonLangMapper();
  });

  describe('main', () => {
    test('CommonGetLangsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an langs founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new CommonGetLangsQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});

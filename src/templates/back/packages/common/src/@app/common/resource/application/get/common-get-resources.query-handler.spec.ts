import {
  CommonGetResourcesQuery,
  CommonIResourceRepository,
  CommonMockResourceRepository,
  CommonResourceMapper,
} from '@app/common/resource';
import { CommonGetResourcesQueryHandler } from '@app/common/resource/application/get/common-get-resources.query-handler';
import { CommonGetResourcesService } from '@app/common/resource/application/get/common-get-resources.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetResourcesQueryHandler', () => {
  let queryHandler: CommonGetResourcesQueryHandler;
  let service: CommonGetResourcesService;
  let repository: CommonMockResourceRepository;
  let mapper: CommonResourceMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonGetResourcesQueryHandler,
        {
          provide: CommonIResourceRepository,
          useClass: CommonMockResourceRepository,
        },
        {
          provide: CommonGetResourcesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonGetResourcesQueryHandler>(
      CommonGetResourcesQueryHandler,
    );
    service = module.get<CommonGetResourcesService>(CommonGetResourcesService);
    repository = <CommonMockResourceRepository>(
      module.get<CommonIResourceRepository>(CommonIResourceRepository)
    );
    mapper = new CommonResourceMapper();
  });

  describe('main', () => {
    test('CommonGetResourcesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an resources founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new CommonGetResourcesQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});

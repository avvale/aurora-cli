/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonFindResourceQuery,
  CommonIResourceRepository,
  CommonMockResourceRepository,
  CommonResourceMapper,
} from '@app/common/resource';
import { CommonFindResourceQueryHandler } from '@app/common/resource/application/find/common-find-resource.query-handler';
import { CommonFindResourceService } from '@app/common/resource/application/find/common-find-resource.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindResourceQueryHandler', () => {
  let queryHandler: CommonFindResourceQueryHandler;
  let service: CommonFindResourceService;
  let repository: CommonMockResourceRepository;
  let mapper: CommonResourceMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindResourceQueryHandler,
        {
          provide: CommonIResourceRepository,
          useClass: CommonMockResourceRepository,
        },
        {
          provide: CommonFindResourceService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindResourceQueryHandler>(
      CommonFindResourceQueryHandler,
    );
    service = module.get<CommonFindResourceService>(CommonFindResourceService);
    repository = <CommonMockResourceRepository>(
      module.get<CommonIResourceRepository>(CommonIResourceRepository)
    );
    mapper = new CommonResourceMapper();
  });

  describe('main', () => {
    test('CommonFindResourceQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an resource founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new CommonFindResourceQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});

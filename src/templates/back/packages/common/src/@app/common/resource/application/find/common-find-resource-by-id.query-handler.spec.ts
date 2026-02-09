/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonFindResourceByIdQuery,
  CommonIResourceRepository,
  commonMockResourceData,
  CommonMockResourceRepository,
  CommonResourceMapper,
} from '@app/common/resource';
import { CommonFindResourceByIdQueryHandler } from '@app/common/resource/application/find/common-find-resource-by-id.query-handler';
import { CommonFindResourceByIdService } from '@app/common/resource/application/find/common-find-resource-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindResourceByIdQueryHandler', () => {
  let queryHandler: CommonFindResourceByIdQueryHandler;
  let service: CommonFindResourceByIdService;
  let repository: CommonMockResourceRepository;
  let mapper: CommonResourceMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindResourceByIdQueryHandler,
        {
          provide: CommonIResourceRepository,
          useClass: CommonMockResourceRepository,
        },
        {
          provide: CommonFindResourceByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindResourceByIdQueryHandler>(
      CommonFindResourceByIdQueryHandler,
    );
    service = module.get<CommonFindResourceByIdService>(
      CommonFindResourceByIdService,
    );
    repository = <CommonMockResourceRepository>(
      module.get<CommonIResourceRepository>(CommonIResourceRepository)
    );
    mapper = new CommonResourceMapper();
  });

  describe('main', () => {
    test('FindResourceByIdQueryHandler should be defined', () => {
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
        await queryHandler.execute(
          new CommonFindResourceByIdQuery(commonMockResourceData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});

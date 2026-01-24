import {
  IamFindTagQuery,
  IamITagRepository,
  IamMockTagRepository,
  IamTagMapper,
} from '@app/iam/tag';
import { IamFindTagQueryHandler } from '@app/iam/tag/application/find/iam-find-tag.query-handler';
import { IamFindTagService } from '@app/iam/tag/application/find/iam-find-tag.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTagQueryHandler', () => {
  let queryHandler: IamFindTagQueryHandler;
  let service: IamFindTagService;
  let repository: IamMockTagRepository;
  let mapper: IamTagMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamFindTagQueryHandler,
        {
          provide: IamITagRepository,
          useClass: IamMockTagRepository,
        },
        {
          provide: IamFindTagService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamFindTagQueryHandler>(IamFindTagQueryHandler);
    service = module.get<IamFindTagService>(IamFindTagService);
    repository = <IamMockTagRepository>(
      module.get<IamITagRepository>(IamITagRepository)
    );
    mapper = new IamTagMapper();
  });

  describe('main', () => {
    test('IamFindTagQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an tag founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(await queryHandler.execute(new IamFindTagQuery())).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});

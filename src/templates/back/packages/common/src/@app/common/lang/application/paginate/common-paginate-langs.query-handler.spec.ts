/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonILangRepository,
  CommonMockLangRepository,
  CommonPaginateLangsQuery,
} from '@app/common/lang';
import { CommonPaginateLangsQueryHandler } from '@app/common/lang/application/paginate/common-paginate-langs.query-handler';
import { CommonPaginateLangsService } from '@app/common/lang/application/paginate/common-paginate-langs.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateLangsQueryHandler', () => {
  let queryHandler: CommonPaginateLangsQueryHandler;
  let service: CommonPaginateLangsService;
  let repository: CommonMockLangRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonPaginateLangsQueryHandler,
        {
          provide: CommonILangRepository,
          useClass: CommonMockLangRepository,
        },
        {
          provide: CommonPaginateLangsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonPaginateLangsQueryHandler>(
      CommonPaginateLangsQueryHandler,
    );
    service = module.get<CommonPaginateLangsService>(
      CommonPaginateLangsService,
    );
    repository = <CommonMockLangRepository>(
      module.get<CommonILangRepository>(CommonILangRepository)
    );
  });

  describe('main', () => {
    test('CommonPaginateLangsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an langs paginated', async () => {
      jest.spyOn(service, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              count: 10,
              total: 100,
              rows: repository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await queryHandler.execute(
          new CommonPaginateLangsQuery({
            offset: 0,
            limit: 10,
          }),
        ),
      ).toStrictEqual(
        new PaginationResponse(
          100,
          10,
          repository.collectionSource.slice(0, 10).map((item) => item.toDTO()),
        ),
      );
    });
  });
});

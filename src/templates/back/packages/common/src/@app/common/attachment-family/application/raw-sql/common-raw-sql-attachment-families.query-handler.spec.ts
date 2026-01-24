import {
  CommonAttachmentFamilyMapper,
  CommonIAttachmentFamilyRepository,
  CommonMockAttachmentFamilyRepository,
  CommonRawSQLAttachmentFamiliesQuery,
} from '@app/common/attachment-family';
import { CommonRawSQLAttachmentFamiliesQueryHandler } from '@app/common/attachment-family/application/raw-sql/common-raw-sql-attachment-families.query-handler';
import { CommonRawSQLAttachmentFamiliesService } from '@app/common/attachment-family/application/raw-sql/common-raw-sql-attachment-families.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLAttachmentFamiliesQueryHandler', () => {
  let queryHandler: CommonRawSQLAttachmentFamiliesQueryHandler;
  let service: CommonRawSQLAttachmentFamiliesService;
  let repository: CommonMockAttachmentFamilyRepository;
  let mapper: CommonAttachmentFamilyMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonRawSQLAttachmentFamiliesQueryHandler,
        {
          provide: CommonIAttachmentFamilyRepository,
          useClass: CommonMockAttachmentFamilyRepository,
        },
        {
          provide: CommonRawSQLAttachmentFamiliesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonRawSQLAttachmentFamiliesQueryHandler>(
      CommonRawSQLAttachmentFamiliesQueryHandler,
    );
    service = module.get<CommonRawSQLAttachmentFamiliesService>(
      CommonRawSQLAttachmentFamiliesService,
    );
    repository = <CommonMockAttachmentFamilyRepository>(
      module.get<CommonIAttachmentFamilyRepository>(
        CommonIAttachmentFamilyRepository,
      )
    );
    mapper = new CommonAttachmentFamilyMapper();
  });

  describe('main', () => {
    test('CommonRawSQLAttachmentFamiliesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an attachmentFamilies founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new CommonRawSQLAttachmentFamiliesQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});

import {
  CommonAttachmentLibraryMapper,
  CommonFindAttachmentLibraryByIdQuery,
  CommonIAttachmentLibraryRepository,
  commonMockAttachmentLibraryData,
  CommonMockAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonFindAttachmentLibraryByIdQueryHandler } from '@app/common/attachment-library/application/find/common-find-attachment-library-by-id.query-handler';
import { CommonFindAttachmentLibraryByIdService } from '@app/common/attachment-library/application/find/common-find-attachment-library-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentLibraryByIdQueryHandler', () => {
  let queryHandler: CommonFindAttachmentLibraryByIdQueryHandler;
  let service: CommonFindAttachmentLibraryByIdService;
  let repository: CommonMockAttachmentLibraryRepository;
  let mapper: CommonAttachmentLibraryMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindAttachmentLibraryByIdQueryHandler,
        {
          provide: CommonIAttachmentLibraryRepository,
          useClass: CommonMockAttachmentLibraryRepository,
        },
        {
          provide: CommonFindAttachmentLibraryByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindAttachmentLibraryByIdQueryHandler>(
      CommonFindAttachmentLibraryByIdQueryHandler,
    );
    service = module.get<CommonFindAttachmentLibraryByIdService>(
      CommonFindAttachmentLibraryByIdService,
    );
    repository = <CommonMockAttachmentLibraryRepository>(
      module.get<CommonIAttachmentLibraryRepository>(
        CommonIAttachmentLibraryRepository,
      )
    );
    mapper = new CommonAttachmentLibraryMapper();
  });

  describe('main', () => {
    test('FindAttachmentLibraryByIdQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an attachmentLibrary founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new CommonFindAttachmentLibraryByIdQuery(
            commonMockAttachmentLibraryData[0].id,
          ),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});

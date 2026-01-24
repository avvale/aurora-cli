import {
  CommonAttachmentLibraryMapper,
  CommonFindAttachmentLibraryQuery,
  CommonIAttachmentLibraryRepository,
  CommonMockAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonFindAttachmentLibraryQueryHandler } from '@app/common/attachment-library/application/find/common-find-attachment-library.query-handler';
import { CommonFindAttachmentLibraryService } from '@app/common/attachment-library/application/find/common-find-attachment-library.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentLibraryQueryHandler', () => {
  let queryHandler: CommonFindAttachmentLibraryQueryHandler;
  let service: CommonFindAttachmentLibraryService;
  let repository: CommonMockAttachmentLibraryRepository;
  let mapper: CommonAttachmentLibraryMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindAttachmentLibraryQueryHandler,
        {
          provide: CommonIAttachmentLibraryRepository,
          useClass: CommonMockAttachmentLibraryRepository,
        },
        {
          provide: CommonFindAttachmentLibraryService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindAttachmentLibraryQueryHandler>(
      CommonFindAttachmentLibraryQueryHandler,
    );
    service = module.get<CommonFindAttachmentLibraryService>(
      CommonFindAttachmentLibraryService,
    );
    repository = <CommonMockAttachmentLibraryRepository>(
      module.get<CommonIAttachmentLibraryRepository>(
        CommonIAttachmentLibraryRepository,
      )
    );
    mapper = new CommonAttachmentLibraryMapper();
  });

  describe('main', () => {
    test('CommonFindAttachmentLibraryQueryHandler should be defined', () => {
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
        await queryHandler.execute(new CommonFindAttachmentLibraryQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});

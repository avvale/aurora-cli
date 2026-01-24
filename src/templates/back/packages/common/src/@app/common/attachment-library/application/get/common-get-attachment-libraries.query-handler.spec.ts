import {
  CommonAttachmentLibraryMapper,
  CommonGetAttachmentLibrariesQuery,
  CommonIAttachmentLibraryRepository,
  CommonMockAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonGetAttachmentLibrariesQueryHandler } from '@app/common/attachment-library/application/get/common-get-attachment-libraries.query-handler';
import { CommonGetAttachmentLibrariesService } from '@app/common/attachment-library/application/get/common-get-attachment-libraries.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetAttachmentLibrariesQueryHandler', () => {
  let queryHandler: CommonGetAttachmentLibrariesQueryHandler;
  let service: CommonGetAttachmentLibrariesService;
  let repository: CommonMockAttachmentLibraryRepository;
  let mapper: CommonAttachmentLibraryMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonGetAttachmentLibrariesQueryHandler,
        {
          provide: CommonIAttachmentLibraryRepository,
          useClass: CommonMockAttachmentLibraryRepository,
        },
        {
          provide: CommonGetAttachmentLibrariesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonGetAttachmentLibrariesQueryHandler>(
      CommonGetAttachmentLibrariesQueryHandler,
    );
    service = module.get<CommonGetAttachmentLibrariesService>(
      CommonGetAttachmentLibrariesService,
    );
    repository = <CommonMockAttachmentLibraryRepository>(
      module.get<CommonIAttachmentLibraryRepository>(
        CommonIAttachmentLibraryRepository,
      )
    );
    mapper = new CommonAttachmentLibraryMapper();
  });

  describe('main', () => {
    test('CommonGetAttachmentLibrariesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an attachmentLibraries founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new CommonGetAttachmentLibrariesQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});

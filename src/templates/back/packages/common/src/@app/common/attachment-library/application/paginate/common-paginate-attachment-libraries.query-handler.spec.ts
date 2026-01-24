import {
  CommonIAttachmentLibraryRepository,
  CommonMockAttachmentLibraryRepository,
  CommonPaginateAttachmentLibrariesQuery,
} from '@app/common/attachment-library';
import { CommonPaginateAttachmentLibrariesQueryHandler } from '@app/common/attachment-library/application/paginate/common-paginate-attachment-libraries.query-handler';
import { CommonPaginateAttachmentLibrariesService } from '@app/common/attachment-library/application/paginate/common-paginate-attachment-libraries.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentLibrariesQueryHandler', () => {
  let queryHandler: CommonPaginateAttachmentLibrariesQueryHandler;
  let service: CommonPaginateAttachmentLibrariesService;
  let repository: CommonMockAttachmentLibraryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonPaginateAttachmentLibrariesQueryHandler,
        {
          provide: CommonIAttachmentLibraryRepository,
          useClass: CommonMockAttachmentLibraryRepository,
        },
        {
          provide: CommonPaginateAttachmentLibrariesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonPaginateAttachmentLibrariesQueryHandler>(
      CommonPaginateAttachmentLibrariesQueryHandler,
    );
    service = module.get<CommonPaginateAttachmentLibrariesService>(
      CommonPaginateAttachmentLibrariesService,
    );
    repository = <CommonMockAttachmentLibraryRepository>(
      module.get<CommonIAttachmentLibraryRepository>(
        CommonIAttachmentLibraryRepository,
      )
    );
  });

  describe('main', () => {
    test('CommonPaginateAttachmentLibrariesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an attachmentLibraries paginated', async () => {
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
          new CommonPaginateAttachmentLibrariesQuery({
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

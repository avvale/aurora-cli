import {
  CommonAttachmentFamilyMapper,
  CommonFindAttachmentFamilyQuery,
  CommonIAttachmentFamilyRepository,
  CommonMockAttachmentFamilyRepository,
} from '@app/common/attachment-family';
import { CommonFindAttachmentFamilyQueryHandler } from '@app/common/attachment-family/application/find/common-find-attachment-family.query-handler';
import { CommonFindAttachmentFamilyService } from '@app/common/attachment-family/application/find/common-find-attachment-family.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentFamilyQueryHandler', () => {
  let queryHandler: CommonFindAttachmentFamilyQueryHandler;
  let service: CommonFindAttachmentFamilyService;
  let repository: CommonMockAttachmentFamilyRepository;
  let mapper: CommonAttachmentFamilyMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindAttachmentFamilyQueryHandler,
        {
          provide: CommonIAttachmentFamilyRepository,
          useClass: CommonMockAttachmentFamilyRepository,
        },
        {
          provide: CommonFindAttachmentFamilyService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindAttachmentFamilyQueryHandler>(
      CommonFindAttachmentFamilyQueryHandler,
    );
    service = module.get<CommonFindAttachmentFamilyService>(
      CommonFindAttachmentFamilyService,
    );
    repository = <CommonMockAttachmentFamilyRepository>(
      module.get<CommonIAttachmentFamilyRepository>(
        CommonIAttachmentFamilyRepository,
      )
    );
    mapper = new CommonAttachmentFamilyMapper();
  });

  describe('main', () => {
    test('CommonFindAttachmentFamilyQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an attachmentFamily founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new CommonFindAttachmentFamilyQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});

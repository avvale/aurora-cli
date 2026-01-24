import {
  CommonAttachmentMapper,
  CommonFindAttachmentByIdQuery,
  CommonIAttachmentRepository,
  commonMockAttachmentData,
  CommonMockAttachmentRepository,
} from '@app/common/attachment';
import { CommonFindAttachmentByIdQueryHandler } from '@app/common/attachment/application/find/common-find-attachment-by-id.query-handler';
import { CommonFindAttachmentByIdService } from '@app/common/attachment/application/find/common-find-attachment-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentByIdQueryHandler', () => {
  let queryHandler: CommonFindAttachmentByIdQueryHandler;
  let service: CommonFindAttachmentByIdService;
  let repository: CommonMockAttachmentRepository;
  let mapper: CommonAttachmentMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindAttachmentByIdQueryHandler,
        {
          provide: CommonIAttachmentRepository,
          useClass: CommonMockAttachmentRepository,
        },
        {
          provide: CommonFindAttachmentByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindAttachmentByIdQueryHandler>(
      CommonFindAttachmentByIdQueryHandler,
    );
    service = module.get<CommonFindAttachmentByIdService>(
      CommonFindAttachmentByIdService,
    );
    repository = <CommonMockAttachmentRepository>(
      module.get<CommonIAttachmentRepository>(CommonIAttachmentRepository)
    );
    mapper = new CommonAttachmentMapper();
  });

  describe('main', () => {
    test('FindAttachmentByIdQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an attachment founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new CommonFindAttachmentByIdQuery(commonMockAttachmentData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});

import {
  CommonAttachmentMapper,
  CommonGetAttachmentsQuery,
  CommonIAttachmentRepository,
  CommonMockAttachmentRepository,
} from '@app/common/attachment';
import { CommonGetAttachmentsQueryHandler } from '@app/common/attachment/application/get/common-get-attachments.query-handler';
import { CommonGetAttachmentsService } from '@app/common/attachment/application/get/common-get-attachments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetAttachmentsQueryHandler', () => {
  let queryHandler: CommonGetAttachmentsQueryHandler;
  let service: CommonGetAttachmentsService;
  let repository: CommonMockAttachmentRepository;
  let mapper: CommonAttachmentMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonGetAttachmentsQueryHandler,
        {
          provide: CommonIAttachmentRepository,
          useClass: CommonMockAttachmentRepository,
        },
        {
          provide: CommonGetAttachmentsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonGetAttachmentsQueryHandler>(
      CommonGetAttachmentsQueryHandler,
    );
    service = module.get<CommonGetAttachmentsService>(
      CommonGetAttachmentsService,
    );
    repository = <CommonMockAttachmentRepository>(
      module.get<CommonIAttachmentRepository>(CommonIAttachmentRepository)
    );
    mapper = new CommonAttachmentMapper();
  });

  describe('main', () => {
    test('CommonGetAttachmentsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an attachments founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new CommonGetAttachmentsQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});

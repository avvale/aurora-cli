import { IamITagRepository, IamMockTagRepository } from '@app/iam/tag';
import { IamPaginateTagsService } from '@app/iam/tag/application/paginate/iam-paginate-tags.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTagsService', () => {
  let service: IamPaginateTagsService;
  let repository: IamITagRepository;
  let mockRepository: IamMockTagRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamPaginateTagsService,
        IamMockTagRepository,
        {
          provide: IamITagRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamPaginateTagsService);
    repository = module.get(IamITagRepository);
    mockRepository = module.get(IamMockTagRepository);
  });

  describe('main', () => {
    test('IamPaginateTagsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate tags', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});

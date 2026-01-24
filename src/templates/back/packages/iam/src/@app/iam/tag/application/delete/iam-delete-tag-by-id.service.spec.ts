/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamITagRepository,
  iamMockTagData,
  IamMockTagRepository,
} from '@app/iam/tag';
import { IamDeleteTagByIdService } from '@app/iam/tag/application/delete/iam-delete-tag-by-id.service';
import { IamTagId } from '@app/iam/tag/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTagByIdService', () => {
  let service: IamDeleteTagByIdService;
  let repository: IamITagRepository;
  let mockRepository: IamMockTagRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamDeleteTagByIdService,
        IamMockTagRepository,
        {
          provide: IamITagRepository,
          useValue: {
            deleteById: (id) => {
              /**/
            },
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamDeleteTagByIdService);
    repository = module.get(IamITagRepository);
    mockRepository = module.get(IamMockTagRepository);
  });

  describe('main', () => {
    test('IamDeleteTagByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete tag and emit event', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main(new IamTagId(iamMockTagData[0].id), {})).toBe(
        undefined,
      );
    });
  });
});

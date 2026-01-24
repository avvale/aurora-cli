import {
  ToolsIKeyValueRepository,
  toolsMockKeyValueData,
  ToolsMockKeyValueRepository,
} from '@app/tools/key-value';
import { ToolsFindKeyValueByIdService } from '@app/tools/key-value/application/find/tools-find-key-value-by-id.service';
import { ToolsKeyValueId } from '@app/tools/key-value/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindKeyValueByIdService', () => {
  let service: ToolsFindKeyValueByIdService;
  let repository: ToolsIKeyValueRepository;
  let mockRepository: ToolsMockKeyValueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsFindKeyValueByIdService,
        ToolsMockKeyValueRepository,
        {
          provide: ToolsIKeyValueRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsFindKeyValueByIdService);
    repository = module.get(ToolsIKeyValueRepository);
    mockRepository = module.get(ToolsMockKeyValueRepository);
  });

  describe('main', () => {
    test('FindKeyValueByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find keyValue by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new ToolsKeyValueId(toolsMockKeyValueData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});

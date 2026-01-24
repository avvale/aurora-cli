/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsIKeyValueRepository,
  toolsMockKeyValueData,
  ToolsMockKeyValueRepository,
} from '@app/tools/key-value';
import { ToolsDeleteKeyValueByIdService } from '@app/tools/key-value/application/delete/tools-delete-key-value-by-id.service';
import { ToolsKeyValueId } from '@app/tools/key-value/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteKeyValueByIdService', () => {
  let service: ToolsDeleteKeyValueByIdService;
  let repository: ToolsIKeyValueRepository;
  let mockRepository: ToolsMockKeyValueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsDeleteKeyValueByIdService,
        ToolsMockKeyValueRepository,
        {
          provide: ToolsIKeyValueRepository,
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

    service = module.get(ToolsDeleteKeyValueByIdService);
    repository = module.get(ToolsIKeyValueRepository);
    mockRepository = module.get(ToolsMockKeyValueRepository);
  });

  describe('main', () => {
    test('ToolsDeleteKeyValueByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete keyValue and emit event', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new ToolsKeyValueId(toolsMockKeyValueData[0].id),
          {},
        ),
      ).toBe(undefined);
    });
  });
});

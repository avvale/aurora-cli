/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsIKeyValueRepository,
  ToolsMockKeyValueRepository,
} from '@app/tools/key-value';
import { ToolsCreateKeyValuesService } from '@app/tools/key-value/application/create/tools-create-key-values.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateKeyValuesService', () => {
  let service: ToolsCreateKeyValuesService;
  let mockRepository: ToolsMockKeyValueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsCreateKeyValuesService,
        ToolsMockKeyValueRepository,
        {
          provide: ToolsIKeyValueRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsCreateKeyValuesService);
    mockRepository = module.get(ToolsMockKeyValueRepository);
  });

  describe('main', () => {
    test('CreateKeyValuesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create keyValues and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});

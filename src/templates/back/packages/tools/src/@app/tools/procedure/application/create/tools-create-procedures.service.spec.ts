/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsIProcedureRepository,
  ToolsMockProcedureRepository,
} from '@app/tools/procedure';
import { ToolsCreateProceduresService } from '@app/tools/procedure/application/create/tools-create-procedures.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateProceduresService', () => {
  let service: ToolsCreateProceduresService;
  let mockRepository: ToolsMockProcedureRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsCreateProceduresService,
        ToolsMockProcedureRepository,
        {
          provide: ToolsIProcedureRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsCreateProceduresService);
    mockRepository = module.get(ToolsMockProcedureRepository);
  });

  describe('main', () => {
    test('CreateProceduresService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create procedures and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});

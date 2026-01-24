/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsIProcedureRepository,
  ToolsMockProcedureRepository,
} from '@app/tools/procedure';
import { ToolsDeleteProceduresService } from '@app/tools/procedure/application/delete/tools-delete-procedures.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteProceduresService', () => {
  let service: ToolsDeleteProceduresService;
  let repository: ToolsIProcedureRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsDeleteProceduresService,
        ToolsMockProcedureRepository,
        {
          provide: ToolsIProcedureRepository,
          useValue: {
            get: () => {
              /**/
            },
            delete: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsDeleteProceduresService);
    repository = module.get(ToolsIProcedureRepository);
  });

  describe('main', () => {
    test('ToolsDeleteProceduresService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete procedure and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});

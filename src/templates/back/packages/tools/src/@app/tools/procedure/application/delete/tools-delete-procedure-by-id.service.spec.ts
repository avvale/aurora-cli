/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsIProcedureRepository,
  toolsMockProcedureData,
  ToolsMockProcedureRepository,
} from '@app/tools/procedure';
import { ToolsDeleteProcedureByIdService } from '@app/tools/procedure/application/delete/tools-delete-procedure-by-id.service';
import { ToolsProcedureId } from '@app/tools/procedure/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteProcedureByIdService', () => {
  let service: ToolsDeleteProcedureByIdService;
  let repository: ToolsIProcedureRepository;
  let mockRepository: ToolsMockProcedureRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsDeleteProcedureByIdService,
        ToolsMockProcedureRepository,
        {
          provide: ToolsIProcedureRepository,
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

    service = module.get(ToolsDeleteProcedureByIdService);
    repository = module.get(ToolsIProcedureRepository);
    mockRepository = module.get(ToolsMockProcedureRepository);
  });

  describe('main', () => {
    test('ToolsDeleteProcedureByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete procedure and emit event', async () => {
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
          new ToolsProcedureId(toolsMockProcedureData[0].id),
          {},
        ),
      ).toBe(undefined);
    });
  });
});

import {
  ToolsIProcedureRepository,
  ToolsMockProcedureRepository,
} from '@app/tools/procedure';
import { ToolsPaginateProceduresService } from '@app/tools/procedure/application/paginate/tools-paginate-procedures.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateProceduresService', () => {
  let service: ToolsPaginateProceduresService;
  let repository: ToolsIProcedureRepository;
  let mockRepository: ToolsMockProcedureRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsPaginateProceduresService,
        ToolsMockProcedureRepository,
        {
          provide: ToolsIProcedureRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsPaginateProceduresService);
    repository = module.get(ToolsIProcedureRepository);
    mockRepository = module.get(ToolsMockProcedureRepository);
  });

  describe('main', () => {
    test('ToolsPaginateProceduresService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate procedures', async () => {
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

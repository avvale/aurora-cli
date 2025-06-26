import { ToolsIProcedureRepository, toolsMockProcedureData, ToolsMockProcedureRepository } from '@app/tools/procedure';
import { ToolsFindProcedureByIdService } from '@app/tools/procedure/application/find/tools-find-procedure-by-id.service';
import { ToolsProcedureId } from '@app/tools/procedure/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindProcedureByIdService', () =>
{
    let service: ToolsFindProcedureByIdService;
    let repository: ToolsIProcedureRepository;
    let mockRepository: ToolsMockProcedureRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsFindProcedureByIdService,
                ToolsMockProcedureRepository,
                {
                    provide : ToolsIProcedureRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(ToolsFindProcedureByIdService);
        repository = module.get(ToolsIProcedureRepository);
        mockRepository = module.get(ToolsMockProcedureRepository);
    });

    describe('main', () =>
    {
        test('FindProcedureByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find procedure by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ToolsProcedureId(toolsMockProcedureData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});

import {
    ToolsIProcedureRepository,
    ToolsMockProcedureRepository,
} from '@app/tools/procedure';
import { ToolsFindProcedureService } from '@app/tools/procedure/application/find/tools-find-procedure.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindProcedureService', () => {
    let service: ToolsFindProcedureService;
    let repository: ToolsIProcedureRepository;
    let mockRepository: ToolsMockProcedureRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsFindProcedureService,
                ToolsMockProcedureRepository,
                {
                    provide: ToolsIProcedureRepository,
                    useValue: {
                        find: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsFindProcedureService);
        repository = module.get(ToolsIProcedureRepository);
        mockRepository = module.get(ToolsMockProcedureRepository);
    });

    describe('main', () => {
        test('ToolsFindProcedureService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find procedure', async () => {
            jest.spyOn(repository, 'find').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource[0],
            );
        });
    });
});

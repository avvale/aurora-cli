import {
    ToolsIProcedureRepository,
    ToolsMockProcedureRepository,
} from '@app/tools/procedure';
import { ToolsGetProceduresService } from '@app/tools/procedure/application/get/tools-get-procedures.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetProceduresService', () => {
    let service: ToolsGetProceduresService;
    let repository: ToolsIProcedureRepository;
    let mockRepository: ToolsMockProcedureRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsGetProceduresService,
                ToolsMockProcedureRepository,
                {
                    provide: ToolsIProcedureRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsGetProceduresService);
        repository = module.get(ToolsIProcedureRepository);
        mockRepository = module.get(ToolsMockProcedureRepository);
    });

    describe('main', () => {
        test('GetProceduresService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should get procedures', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource),
                    ),
            );
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});

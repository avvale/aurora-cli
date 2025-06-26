import { ToolsIKeyValueRepository, ToolsMockKeyValueRepository } from '@app/tools/key-value';
import { ToolsFindKeyValueService } from '@app/tools/key-value/application/find/tools-find-key-value.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindKeyValueService', () =>
{
    let service: ToolsFindKeyValueService;
    let repository: ToolsIKeyValueRepository;
    let mockRepository: ToolsMockKeyValueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsFindKeyValueService,
                ToolsMockKeyValueRepository,
                {
                    provide : ToolsIKeyValueRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(ToolsFindKeyValueService);
        repository = module.get(ToolsIKeyValueRepository);
        mockRepository = module.get(ToolsMockKeyValueRepository);
    });

    describe('main', () =>
    {
        test('ToolsFindKeyValueService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find keyValue', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});

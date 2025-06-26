import { ToolsIKeyValueRepository, ToolsMockKeyValueRepository } from '@app/tools/key-value';
import { ToolsGetKeyValuesService } from '@app/tools/key-value/application/get/tools-get-key-values.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetKeyValuesService', () =>
{
    let service: ToolsGetKeyValuesService;
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
                ToolsGetKeyValuesService,
                ToolsMockKeyValueRepository,
                {
                    provide : ToolsIKeyValueRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(ToolsGetKeyValuesService);
        repository = module.get(ToolsIKeyValueRepository);
        mockRepository = module.get(ToolsMockKeyValueRepository);
    });

    describe('main', () =>
    {
        test('GetKeyValuesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get keyValues', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});

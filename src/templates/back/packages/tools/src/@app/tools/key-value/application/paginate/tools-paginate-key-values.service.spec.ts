import { ToolsIKeyValueRepository, ToolsMockKeyValueRepository } from '@app/tools/key-value';
import { ToolsPaginateKeyValuesService } from '@app/tools/key-value/application/paginate/tools-paginate-key-values.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateKeyValuesService', () =>
{
    let service: ToolsPaginateKeyValuesService;
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
                ToolsPaginateKeyValuesService,
                ToolsMockKeyValueRepository,
                {
                    provide : ToolsIKeyValueRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(ToolsPaginateKeyValuesService);
        repository = module.get(ToolsIKeyValueRepository);
        mockRepository = module.get(ToolsMockKeyValueRepository);
    });

    describe('main', () =>
    {
        test('ToolsPaginateKeyValuesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate keyValues', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});

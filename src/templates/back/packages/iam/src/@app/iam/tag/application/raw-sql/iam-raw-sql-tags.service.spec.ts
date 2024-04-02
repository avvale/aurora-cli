import { IamITagRepository, IamMockTagRepository } from '@app/iam/tag';
import { IamRawSQLTagsService } from '@app/iam/tag/application/raw-sql/iam-raw-sql-tags.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamRawSQLTagsService ', () =>
{
    let service: IamRawSQLTagsService ;
    let repository: IamITagRepository;
    let mockRepository: IamMockTagRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamRawSQLTagsService ,
                IamMockTagRepository,
                {
                    provide : IamITagRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(IamRawSQLTagsService );
        repository      = module.get(IamITagRepository);
        mockRepository  = module.get(IamMockTagRepository);
    });

    describe('main', () =>
    {
        test('RawSQLTagsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get tags', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});

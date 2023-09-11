import { IamIBoundedContextRepository, IamMockBoundedContextRepository } from '@app/iam/bounded-context';
import { IamRawSQLBoundedContextsService } from '@app/iam/bounded-context/application/raw-sql/iam-raw-sql-bounded-contexts.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamRawSQLBoundedContextsService ', () =>
{
    let service: IamRawSQLBoundedContextsService ;
    let repository: IamIBoundedContextRepository;
    let mockRepository: IamMockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamRawSQLBoundedContextsService ,
                IamMockBoundedContextRepository,
                {
                    provide : IamIBoundedContextRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(IamRawSQLBoundedContextsService );
        repository      = module.get(IamIBoundedContextRepository);
        mockRepository  = module.get(IamMockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('RawSQLBoundedContextsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get boundedContexts', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});

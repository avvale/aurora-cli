import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetBoundedContextsQueryHandler } from './get-bounded-contexts.query-handler';
import { MockBoundedContextRepository } from '../../../../../@apps/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { IBoundedContextRepository } from '../../../../../@apps/iam/bounded-context/domain/bounded-context.repository';
import { BoundedContextMapper } from '../../../../../@apps/iam/bounded-context/domain/bounded-context.mapper';
import { GetBoundedContextsQuery } from './get-bounded-contexts.query';
import { GetBoundedContextsService } from './get-bounded-contexts.service';

describe('GetBoundedContextsQueryHandler', () =>
{
    let queryHandler: GetBoundedContextsQueryHandler;
    let service: GetBoundedContextsService;
    let repository: MockBoundedContextRepository;
    let mapper: BoundedContextMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetBoundedContextsQueryHandler,
                {
                    provide : IBoundedContextRepository,
                    useClass: MockBoundedContextRepository
                },
                {
                    provide : GetBoundedContextsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetBoundedContextsQueryHandler>(GetBoundedContextsQueryHandler);
        service         = module.get<GetBoundedContextsService>(GetBoundedContextsService);
        repository      = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);
        mapper          = new BoundedContextMapper();
    });

    describe('main', () =>
    {
        test('GetBoundedContextsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an boundedContexts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetBoundedContextsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
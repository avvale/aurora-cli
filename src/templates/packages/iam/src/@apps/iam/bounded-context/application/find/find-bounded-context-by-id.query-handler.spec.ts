import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindBoundedContextByIdQueryHandler } from './find-bounded-context-by-id.query-handler';
import { MockBoundedContextRepository } from '../../../../../@apps/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { boundedContexts } from '../../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { IBoundedContextRepository } from '../../../../../@apps/iam/bounded-context/domain/bounded-context.repository';
import { BoundedContextMapper } from '../../../../../@apps/iam/bounded-context/domain/bounded-context.mapper';
import { FindBoundedContextByIdQuery } from './find-bounded-context-by-id.query';
import { FindBoundedContextByIdService } from './find-bounded-context-by-id.service';

describe('FindBoundedContextByIdQueryHandler', () =>
{
    let queryHandler: FindBoundedContextByIdQueryHandler;
    let service: FindBoundedContextByIdService;
    let repository: MockBoundedContextRepository;
    let mapper: BoundedContextMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindBoundedContextByIdQueryHandler,
                {
                    provide : IBoundedContextRepository,
                    useClass: MockBoundedContextRepository
                },
                {
                    provide : FindBoundedContextByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindBoundedContextByIdQueryHandler>(FindBoundedContextByIdQueryHandler);
        service         = module.get<FindBoundedContextByIdService>(FindBoundedContextByIdService);
        repository      = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);
        mapper          = new BoundedContextMapper();
    });

    describe('main', () =>
    {
        test('FindBoundedContextByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an boundedContext founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindBoundedContextByIdQuery(
                    boundedContexts[0].id,

                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
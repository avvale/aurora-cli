import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindBoundedContextQueryHandler } from './iam-find-bounded-context.query-handler';
import { IamMockBoundedContextRepository } from '@app/iam/bounded-context/infrastructure/mock/iam-mock-bounded-context.repository';
import { IamIBoundedContextRepository } from '@app/iam/bounded-context/domain/iam-bounded-context.repository';
import { IamBoundedContextMapper } from '@app/iam/bounded-context/domain/iam-bounded-context.mapper';
import { IamFindBoundedContextQuery } from './iam-find-bounded-context.query';
import { IamFindBoundedContextService } from './iam-find-bounded-context.service';

describe('IamFindBoundedContextQueryHandler', () =>
{
    let queryHandler: IamFindBoundedContextQueryHandler;
    let service: IamFindBoundedContextService;
    let repository: IamMockBoundedContextRepository;
    let mapper: IamBoundedContextMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindBoundedContextQueryHandler,
                {
                    provide : IamIBoundedContextRepository,
                    useClass: IamMockBoundedContextRepository,
                },
                {
                    provide : IamFindBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamFindBoundedContextQueryHandler>(IamFindBoundedContextQueryHandler);
        service = module.get<IamFindBoundedContextService>(IamFindBoundedContextService);
        repository = <IamMockBoundedContextRepository>module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository);
        mapper = new IamBoundedContextMapper();
    });

    describe('main', () =>
    {
        test('IamFindBoundedContextQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an boundedContext founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new IamFindBoundedContextQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

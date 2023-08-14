import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetBoundedContextsQueryHandler } from './iam-get-bounded-contexts.query-handler';
import { IamMockBoundedContextRepository } from '@app/iam/bounded-context/infrastructure/mock/iam-mock-bounded-context.repository';
import { IamIBoundedContextRepository } from '@app/iam/bounded-context/domain/iam-bounded-context.repository';
import { IamBoundedContextMapper } from '@app/iam/bounded-context/domain/iam-bounded-context.mapper';
import { IamGetBoundedContextsQuery } from './iam-get-bounded-contexts.query';
import { IamGetBoundedContextsService } from './iam-get-bounded-contexts.service';

describe('GetBoundedContextsQueryHandler', () =>
{
    let queryHandler: IamGetBoundedContextsQueryHandler;
    let service: IamGetBoundedContextsService;
    let repository: IamMockBoundedContextRepository;
    let mapper: IamBoundedContextMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetBoundedContextsQueryHandler,
                {
                    provide : IamIBoundedContextRepository,
                    useClass: IamMockBoundedContextRepository,
                },
                {
                    provide : IamGetBoundedContextsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamGetBoundedContextsQueryHandler>(IamGetBoundedContextsQueryHandler);
        service = module.get<IamGetBoundedContextsService>(IamGetBoundedContextsService);
        repository = <IamMockBoundedContextRepository>module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository);
        mapper = new IamBoundedContextMapper();
    });

    describe('main', () =>
    {
        test('IamGetBoundedContextsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an boundedContexts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamGetBoundedContextsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
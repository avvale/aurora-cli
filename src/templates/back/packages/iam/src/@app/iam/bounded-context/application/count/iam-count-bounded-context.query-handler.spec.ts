import { IamCountBoundedContextQuery, IamIBoundedContextRepository, IamMockBoundedContextRepository } from '@app/iam/bounded-context';
import { IamCountBoundedContextQueryHandler } from '@app/iam/bounded-context/application/count/iam-count-bounded-context.query-handler';
import { IamCountBoundedContextService } from '@app/iam/bounded-context/application/count/iam-count-bounded-context.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountBoundedContextQueryHandler', () =>
{
    let queryHandler: IamCountBoundedContextQueryHandler;
    let service: IamCountBoundedContextService;
    let repository: IamMockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCountBoundedContextQueryHandler,
                {
                    provide : IamIBoundedContextRepository,
                    useClass: IamMockBoundedContextRepository,
                },
                {
                    provide : IamCountBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamCountBoundedContextQueryHandler>(IamCountBoundedContextQueryHandler);
        service = module.get<IamCountBoundedContextService>(IamCountBoundedContextService);
        repository = <IamMockBoundedContextRepository>module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('IamCountBoundedContextQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new IamCountBoundedContextQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});

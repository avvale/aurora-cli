import { IamIBoundedContextRepository, IamMockBoundedContextRepository, IamSumBoundedContextQuery } from '@app/iam/bounded-context';
import { IamSumBoundedContextQueryHandler } from '@app/iam/bounded-context/application/sum/iam-sum-bounded-context.query-handler';
import { IamSumBoundedContextService } from '@app/iam/bounded-context/application/sum/iam-sum-bounded-context.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumBoundedContextQueryHandler', () =>
{
    let queryHandler: IamSumBoundedContextQueryHandler;
    let service: IamSumBoundedContextService;
    let repository: IamMockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamSumBoundedContextQueryHandler,
                {
                    provide : IamIBoundedContextRepository,
                    useClass: IamMockBoundedContextRepository,
                },
                {
                    provide : IamSumBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamSumBoundedContextQueryHandler>(IamSumBoundedContextQueryHandler);
        service = module.get<IamSumBoundedContextService>(IamSumBoundedContextService);
        repository = <IamMockBoundedContextRepository>module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('IamSumBoundedContextQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new IamSumBoundedContextQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});

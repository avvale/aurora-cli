import { IamIBoundedContextRepository, IamMaxBoundedContextQuery, IamMockBoundedContextRepository } from '@app/iam/bounded-context';
import { IamMaxBoundedContextQueryHandler } from '@app/iam/bounded-context/application/max/iam-max-bounded-context.query-handler';
import { IamMaxBoundedContextService } from '@app/iam/bounded-context/application/max/iam-max-bounded-context.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxBoundedContextQueryHandler', () =>
{
    let queryHandler: IamMaxBoundedContextQueryHandler;
    let service: IamMaxBoundedContextService;
    let repository: IamMockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMaxBoundedContextQueryHandler,
                {
                    provide : IamIBoundedContextRepository,
                    useClass: IamMockBoundedContextRepository,
                },
                {
                    provide : IamMaxBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMaxBoundedContextQueryHandler>(IamMaxBoundedContextQueryHandler);
        service = module.get<IamMaxBoundedContextService>(IamMaxBoundedContextService);
        repository = <IamMockBoundedContextRepository>module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('IamMaxBoundedContextQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new IamMaxBoundedContextQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});

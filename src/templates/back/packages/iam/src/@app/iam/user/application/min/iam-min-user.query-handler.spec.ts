import { IamIUserRepository, IamMinUserQuery, IamMockUserRepository } from '@app/iam/user';
import { IamMinUserQueryHandler } from '@app/iam/user/application/min/iam-min-user.query-handler';
import { IamMinUserService } from '@app/iam/user/application/min/iam-min-user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinUserQueryHandler', () =>
{
    let queryHandler: IamMinUserQueryHandler;
    let service: IamMinUserService;
    let repository: IamMockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMinUserQueryHandler,
                {
                    provide : IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide : IamMinUserService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMinUserQueryHandler>(IamMinUserQueryHandler);
        service = module.get<IamMinUserService>(IamMinUserService);
        repository = <IamMockUserRepository>module.get<IamIUserRepository>(IamIUserRepository);
    });

    describe('main', () =>
    {
        test('IamMinUserQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new IamMinUserQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});

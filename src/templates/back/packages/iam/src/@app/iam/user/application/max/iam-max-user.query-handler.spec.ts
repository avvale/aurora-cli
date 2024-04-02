import { IamIUserRepository, IamMaxUserQuery, IamMockUserRepository } from '@app/iam/user';
import { IamMaxUserQueryHandler } from '@app/iam/user/application/max/iam-max-user.query-handler';
import { IamMaxUserService } from '@app/iam/user/application/max/iam-max-user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxUserQueryHandler', () =>
{
    let queryHandler: IamMaxUserQueryHandler;
    let service: IamMaxUserService;
    let repository: IamMockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMaxUserQueryHandler,
                {
                    provide : IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide : IamMaxUserService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMaxUserQueryHandler>(IamMaxUserQueryHandler);
        service = module.get<IamMaxUserService>(IamMaxUserService);
        repository = <IamMockUserRepository>module.get<IamIUserRepository>(IamIUserRepository);
    });

    describe('main', () =>
    {
        test('IamMaxUserQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new IamMaxUserQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});

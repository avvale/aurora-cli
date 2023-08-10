import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindUserQueryHandler } from './iam-find-user.query-handler';
import { IamMockUserRepository } from '@app/iam/user/infrastructure/mock/iam-mock-user.repository';
import { IamIUserRepository } from '@app/iam/user/domain/iam-user.repository';
import { IamUserMapper } from '@app/iam/user/domain/iam-user.mapper';
import { IamFindUserQuery } from './iam-find-user.query';
import { IamFindUserService } from './iam-find-user.service';

describe('IamFindUserQueryHandler', () =>
{
    let queryHandler: IamFindUserQueryHandler;
    let service: IamFindUserService;
    let repository: IamMockUserRepository;
    let mapper: IamUserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindUserQueryHandler,
                {
                    provide : IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide : IamFindUserService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamFindUserQueryHandler>(IamFindUserQueryHandler);
        service = module.get<IamFindUserService>(IamFindUserService);
        repository = <IamMockUserRepository>module.get<IamIUserRepository>(IamIUserRepository);
        mapper = new IamUserMapper();
    });

    describe('main', () =>
    {
        test('IamFindUserQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an user founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new IamFindUserQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

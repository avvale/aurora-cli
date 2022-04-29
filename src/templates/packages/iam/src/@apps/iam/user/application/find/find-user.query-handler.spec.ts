import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindUserQueryHandler } from './find-user.query-handler';
import { MockUserRepository } from '../../../../../@apps/iam/user/infrastructure/mock/mock-user.repository';
import { IUserRepository } from '../../../../../@apps/iam/user/domain/user.repository';
import { UserMapper } from '../../../../../@apps/iam/user/domain/user.mapper';
import { FindUserQuery } from './find-user.query';
import { FindUserService } from './find-user.service';

describe('FindUserQueryHandler', () =>
{
    let queryHandler: FindUserQueryHandler;
    let service: FindUserService;
    let repository: MockUserRepository;
    let mapper: UserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindUserQueryHandler,
                {
                    provide : IUserRepository,
                    useClass: MockUserRepository
                },
                {
                    provide : FindUserService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindUserQueryHandler>(FindUserQueryHandler);
        service         = module.get<FindUserService>(FindUserService);
        repository      = <MockUserRepository>module.get<IUserRepository>(IUserRepository);
        mapper          = new UserMapper();
    });

    describe('main', () =>
    {
        test('FindUserQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an user founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindUserQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
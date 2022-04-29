import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetUsersQueryHandler } from './get-users.query-handler';
import { MockUserRepository } from '../../../../../@apps/iam/user/infrastructure/mock/mock-user.repository';
import { IUserRepository } from '../../../../../@apps/iam/user/domain/user.repository';
import { UserMapper } from '../../../../../@apps/iam/user/domain/user.mapper';
import { GetUsersQuery } from './get-users.query';
import { GetUsersService } from './get-users.service';

describe('GetUsersQueryHandler', () =>
{
    let queryHandler: GetUsersQueryHandler;
    let service: GetUsersService;
    let repository: MockUserRepository;
    let mapper: UserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetUsersQueryHandler,
                {
                    provide : IUserRepository,
                    useClass: MockUserRepository
                },
                {
                    provide : GetUsersService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetUsersQueryHandler>(GetUsersQueryHandler);
        service         = module.get<GetUsersService>(GetUsersService);
        repository      = <MockUserRepository>module.get<IUserRepository>(IUserRepository);
        mapper          = new UserMapper();
    });

    describe('main', () =>
    {
        test('GetUsersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an users founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetUsersQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
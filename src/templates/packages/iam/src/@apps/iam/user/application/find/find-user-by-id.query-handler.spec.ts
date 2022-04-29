import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindUserByIdQueryHandler } from './find-user-by-id.query-handler';
import { MockUserRepository } from '../../../../../@apps/iam/user/infrastructure/mock/mock-user.repository';
import { users } from '../../../../../@apps/iam/user/infrastructure/seeds/user.seed';
import { IUserRepository } from '../../../../../@apps/iam/user/domain/user.repository';
import { UserMapper } from '../../../../../@apps/iam/user/domain/user.mapper';
import { FindUserByIdQuery } from './find-user-by-id.query';
import { FindUserByIdService } from './find-user-by-id.service';

describe('FindUserByIdQueryHandler', () =>
{
    let queryHandler: FindUserByIdQueryHandler;
    let service: FindUserByIdService;
    let repository: MockUserRepository;
    let mapper: UserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindUserByIdQueryHandler,
                {
                    provide : IUserRepository,
                    useClass: MockUserRepository
                },
                {
                    provide : FindUserByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindUserByIdQueryHandler>(FindUserByIdQueryHandler);
        service         = module.get<FindUserByIdService>(FindUserByIdService);
        repository      = <MockUserRepository>module.get<IUserRepository>(IUserRepository);
        mapper          = new UserMapper();
    });

    describe('main', () =>
    {
        test('FindUserByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an user founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindUserByIdQuery(
                    users[0].id,

                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
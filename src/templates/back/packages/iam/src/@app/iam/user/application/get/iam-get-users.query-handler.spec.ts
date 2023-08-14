import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetUsersQueryHandler } from './iam-get-users.query-handler';
import { IamMockUserRepository } from '@app/iam/user/infrastructure/mock/iam-mock-user.repository';
import { IamIUserRepository } from '@app/iam/user/domain/iam-user.repository';
import { IamUserMapper } from '@app/iam/user/domain/iam-user.mapper';
import { IamGetUsersQuery } from './iam-get-users.query';
import { IamGetUsersService } from './iam-get-users.service';

describe('GetUsersQueryHandler', () =>
{
    let queryHandler: IamGetUsersQueryHandler;
    let service: IamGetUsersService;
    let repository: IamMockUserRepository;
    let mapper: IamUserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetUsersQueryHandler,
                {
                    provide : IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide : IamGetUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamGetUsersQueryHandler>(IamGetUsersQueryHandler);
        service = module.get<IamGetUsersService>(IamGetUsersService);
        repository = <IamMockUserRepository>module.get<IamIUserRepository>(IamIUserRepository);
        mapper = new IamUserMapper();
    });

    describe('main', () =>
    {
        test('IamGetUsersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an users founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamGetUsersQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
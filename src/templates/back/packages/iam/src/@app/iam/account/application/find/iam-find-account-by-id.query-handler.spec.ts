import {
    IamAccountMapper,
    IamFindAccountByIdQuery,
    IamIAccountRepository,
    iamMockAccountData,
    IamMockAccountRepository,
} from '@app/iam/account';
import { IamFindAccountByIdQueryHandler } from '@app/iam/account/application/find/iam-find-account-by-id.query-handler';
import { IamFindAccountByIdService } from '@app/iam/account/application/find/iam-find-account-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindAccountByIdQueryHandler', () => {
    let queryHandler: IamFindAccountByIdQueryHandler;
    let service: IamFindAccountByIdService;
    let repository: IamMockAccountRepository;
    let mapper: IamAccountMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindAccountByIdQueryHandler,
                {
                    provide: IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide: IamFindAccountByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamFindAccountByIdQueryHandler>(
            IamFindAccountByIdQueryHandler,
        );
        service = module.get<IamFindAccountByIdService>(
            IamFindAccountByIdService,
        );
        repository = <IamMockAccountRepository>(
            module.get<IamIAccountRepository>(IamIAccountRepository)
        );
        mapper = new IamAccountMapper();
    });

    describe('main', () => {
        test('FindAccountByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an account founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new IamFindAccountByIdQuery(iamMockAccountData[0].id),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});

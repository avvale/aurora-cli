import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockHttpCommunicationRepository } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.repository';
import { IHttpCommunicationRepository } from '@app/auditing/http-communication/domain/http-communication.repository';
import { HttpCommunicationMapper } from '@app/auditing/http-communication/domain/http-communication.mapper';
import { RawSQLHttpCommunicationsQueryHandler } from './raw-sql-http-communications.query-handler';
import { RawSQLHttpCommunicationsQuery } from './raw-sql-http-communications.query';
import { RawSQLHttpCommunicationsService } from './raw-sql-http-communications.service';

describe('RawSQLHttpCommunicationsQueryHandler', () =>
{
    let queryHandler: RawSQLHttpCommunicationsQueryHandler;
    let service: RawSQLHttpCommunicationsService;
    let repository: MockHttpCommunicationRepository;
    let mapper: HttpCommunicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLHttpCommunicationsQueryHandler,
                {
                    provide : IHttpCommunicationRepository,
                    useClass: MockHttpCommunicationRepository,
                },
                {
                    provide : RawSQLHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<RawSQLHttpCommunicationsQueryHandler>(RawSQLHttpCommunicationsQueryHandler);
        service = module.get<RawSQLHttpCommunicationsService>(RawSQLHttpCommunicationsService);
        repository = <MockHttpCommunicationRepository>module.get<IHttpCommunicationRepository>(IHttpCommunicationRepository);
        mapper = new HttpCommunicationMapper();
    });

    describe('main', () =>
    {
        test('RawSQLHttpCommunicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an httpCommunications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLHttpCommunicationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
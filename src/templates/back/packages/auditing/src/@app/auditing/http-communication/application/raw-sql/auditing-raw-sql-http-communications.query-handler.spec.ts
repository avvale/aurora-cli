import { AuditingHttpCommunicationMapper, AuditingIHttpCommunicationRepository, AuditingMockHttpCommunicationRepository, AuditingRawSQLHttpCommunicationsQuery } from '@app/auditing/http-communication';
import { AuditingRawSQLHttpCommunicationsQueryHandler } from '@app/auditing/http-communication/application/raw-sql/auditing-raw-sql-http-communications.query-handler';
import { AuditingRawSQLHttpCommunicationsService } from '@app/auditing/http-communication/application/raw-sql/auditing-raw-sql-http-communications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLHttpCommunicationsQueryHandler', () =>
{
    let queryHandler: AuditingRawSQLHttpCommunicationsQueryHandler;
    let service: AuditingRawSQLHttpCommunicationsService;
    let repository: AuditingMockHttpCommunicationRepository;
    let mapper: AuditingHttpCommunicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingRawSQLHttpCommunicationsQueryHandler,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useClass: AuditingMockHttpCommunicationRepository,
                },
                {
                    provide : AuditingRawSQLHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingRawSQLHttpCommunicationsQueryHandler>(AuditingRawSQLHttpCommunicationsQueryHandler);
        service = module.get<AuditingRawSQLHttpCommunicationsService>(AuditingRawSQLHttpCommunicationsService);
        repository = <AuditingMockHttpCommunicationRepository>module.get<AuditingIHttpCommunicationRepository>(AuditingIHttpCommunicationRepository);
        mapper = new AuditingHttpCommunicationMapper();
    });

    describe('main', () =>
    {
        test('AuditingRawSQLHttpCommunicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an httpCommunications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AuditingRawSQLHttpCommunicationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});

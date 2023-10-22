import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingMockHttpCommunicationRepository } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.repository';
import { AuditingIHttpCommunicationRepository } from '@app/auditing/http-communication/domain/auditing-http-communication.repository';
import { AuditingHttpCommunicationMapper } from '@app/auditing/http-communication/domain/auditing-http-communication.mapper';
import { AuditingRawSQLHttpCommunicationsQueryHandler } from './auditing-raw-sql-http-communications.query-handler';
import { AuditingRawSQLHttpCommunicationsQuery } from './auditing-raw-sql-http-communications.query';
import { AuditingRawSQLHttpCommunicationsService } from './auditing-raw-sql-http-communications.service';

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

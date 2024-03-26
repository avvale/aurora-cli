import { AuditingCountHttpCommunicationQuery, AuditingIHttpCommunicationRepository, AuditingMockHttpCommunicationRepository } from '@app/auditing/http-communication';
import { AuditingCountHttpCommunicationQueryHandler } from '@app/auditing/http-communication/application/count/auditing-count-http-communication.query-handler';
import { AuditingCountHttpCommunicationService } from '@app/auditing/http-communication/application/count/auditing-count-http-communication.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCountHttpCommunicationQueryHandler', () =>
{
    let queryHandler: AuditingCountHttpCommunicationQueryHandler;
    let service: AuditingCountHttpCommunicationService;
    let repository: AuditingMockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCountHttpCommunicationQueryHandler,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useClass: AuditingMockHttpCommunicationRepository,
                },
                {
                    provide : AuditingCountHttpCommunicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingCountHttpCommunicationQueryHandler>(AuditingCountHttpCommunicationQueryHandler);
        service = module.get<AuditingCountHttpCommunicationService>(AuditingCountHttpCommunicationService);
        repository = <AuditingMockHttpCommunicationRepository>module.get<AuditingIHttpCommunicationRepository>(AuditingIHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('AuditingCountHttpCommunicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new AuditingCountHttpCommunicationQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});

import { AuditingGetHttpCommunicationsQuery, AuditingHttpCommunicationMapper, AuditingIHttpCommunicationRepository, AuditingMockHttpCommunicationRepository } from '@app/auditing/http-communication';
import { AuditingGetHttpCommunicationsQueryHandler } from '@app/auditing/http-communication/application/get/auditing-get-http-communications.query-handler';
import { AuditingGetHttpCommunicationsService } from '@app/auditing/http-communication/application/get/auditing-get-http-communications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetHttpCommunicationsQueryHandler', () =>
{
    let queryHandler: AuditingGetHttpCommunicationsQueryHandler;
    let service: AuditingGetHttpCommunicationsService;
    let repository: AuditingMockHttpCommunicationRepository;
    let mapper: AuditingHttpCommunicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingGetHttpCommunicationsQueryHandler,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useClass: AuditingMockHttpCommunicationRepository,
                },
                {
                    provide : AuditingGetHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingGetHttpCommunicationsQueryHandler>(AuditingGetHttpCommunicationsQueryHandler);
        service = module.get<AuditingGetHttpCommunicationsService>(AuditingGetHttpCommunicationsService);
        repository = <AuditingMockHttpCommunicationRepository>module.get<AuditingIHttpCommunicationRepository>(AuditingIHttpCommunicationRepository);
        mapper = new AuditingHttpCommunicationMapper();
    });

    describe('main', () =>
    {
        test('AuditingGetHttpCommunicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an httpCommunications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AuditingGetHttpCommunicationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});

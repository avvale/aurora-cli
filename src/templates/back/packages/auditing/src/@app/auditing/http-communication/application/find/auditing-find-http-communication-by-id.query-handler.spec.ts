import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindHttpCommunicationByIdQueryHandler } from './auditing-find-http-communication-by-id.query-handler';
import { AuditingMockHttpCommunicationRepository } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.repository';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.data';
import { AuditingIHttpCommunicationRepository } from '@app/auditing/http-communication/domain/auditing-http-communication.repository';
import { AuditingHttpCommunicationMapper } from '@app/auditing/http-communication/domain/auditing-http-communication.mapper';
import { AuditingFindHttpCommunicationByIdQuery } from './auditing-find-http-communication-by-id.query';
import { AuditingFindHttpCommunicationByIdService } from './auditing-find-http-communication-by-id.service';

describe('AuditingFindHttpCommunicationByIdQueryHandler', () =>
{
    let queryHandler: AuditingFindHttpCommunicationByIdQueryHandler;
    let service: AuditingFindHttpCommunicationByIdService;
    let repository: AuditingMockHttpCommunicationRepository;
    let mapper: AuditingHttpCommunicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingFindHttpCommunicationByIdQueryHandler,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useClass: AuditingMockHttpCommunicationRepository,
                },
                {
                    provide : AuditingFindHttpCommunicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingFindHttpCommunicationByIdQueryHandler>(AuditingFindHttpCommunicationByIdQueryHandler);
        service = module.get<AuditingFindHttpCommunicationByIdService>(AuditingFindHttpCommunicationByIdService);
        repository = <AuditingMockHttpCommunicationRepository>module.get<AuditingIHttpCommunicationRepository>(AuditingIHttpCommunicationRepository);
        mapper = new AuditingHttpCommunicationMapper();
    });

    describe('main', () =>
    {
        test('FindHttpCommunicationByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an httpCommunication founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AuditingFindHttpCommunicationByIdQuery(
                    auditingMockHttpCommunicationData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

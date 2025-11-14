import {
    AuditingFindHttpCommunicationQuery,
    AuditingHttpCommunicationMapper,
    AuditingIHttpCommunicationRepository,
    AuditingMockHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import { AuditingFindHttpCommunicationQueryHandler } from '@app/auditing/http-communication/application/find/auditing-find-http-communication.query-handler';
import { AuditingFindHttpCommunicationService } from '@app/auditing/http-communication/application/find/auditing-find-http-communication.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindHttpCommunicationQueryHandler', () => {
    let queryHandler: AuditingFindHttpCommunicationQueryHandler;
    let service: AuditingFindHttpCommunicationService;
    let repository: AuditingMockHttpCommunicationRepository;
    let mapper: AuditingHttpCommunicationMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingFindHttpCommunicationQueryHandler,
                {
                    provide: AuditingIHttpCommunicationRepository,
                    useClass: AuditingMockHttpCommunicationRepository,
                },
                {
                    provide: AuditingFindHttpCommunicationService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<AuditingFindHttpCommunicationQueryHandler>(
            AuditingFindHttpCommunicationQueryHandler,
        );
        service = module.get<AuditingFindHttpCommunicationService>(
            AuditingFindHttpCommunicationService,
        );
        repository = <AuditingMockHttpCommunicationRepository>(
            module.get<AuditingIHttpCommunicationRepository>(
                AuditingIHttpCommunicationRepository,
            )
        );
        mapper = new AuditingHttpCommunicationMapper();
    });

    describe('main', () => {
        test('AuditingFindHttpCommunicationQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an httpCommunication founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new AuditingFindHttpCommunicationQuery(),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});

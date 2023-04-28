import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetHttpCommunicationsQueryHandler } from './get-http-communications.query-handler';
import { MockHttpCommunicationRepository } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.repository';
import { IHttpCommunicationRepository } from '@app/auditing/http-communication/domain/http-communication.repository';
import { HttpCommunicationMapper } from '@app/auditing/http-communication/domain/http-communication.mapper';
import { GetHttpCommunicationsQuery } from './get-http-communications.query';
import { GetHttpCommunicationsService } from './get-http-communications.service';

describe('GetHttpCommunicationsQueryHandler', () =>
{
    let queryHandler: GetHttpCommunicationsQueryHandler;
    let service: GetHttpCommunicationsService;
    let repository: MockHttpCommunicationRepository;
    let mapper: HttpCommunicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetHttpCommunicationsQueryHandler,
                {
                    provide : IHttpCommunicationRepository,
                    useClass: MockHttpCommunicationRepository,
                },
                {
                    provide : GetHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<GetHttpCommunicationsQueryHandler>(GetHttpCommunicationsQueryHandler);
        service = module.get<GetHttpCommunicationsService>(GetHttpCommunicationsService);
        repository = <MockHttpCommunicationRepository>module.get<IHttpCommunicationRepository>(IHttpCommunicationRepository);
        mapper = new HttpCommunicationMapper();
    });

    describe('main', () =>
    {
        test('GetHttpCommunicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an httpCommunications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetHttpCommunicationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
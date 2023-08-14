import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockClientData } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.data';
import { OAuthFindClientByIdService } from './o-auth-find-client-by-id.service';
import { OAuthClientId } from '../../domain/value-objects';
import { OAuthIClientRepository } from '../../domain/o-auth-client.repository';
import { OAuthMockClientRepository } from '../../infrastructure/mock/o-auth-mock-client.repository';

describe('OAuthFindClientByIdService', () =>
{
    let service: OAuthFindClientByIdService;
    let repository: OAuthIClientRepository;
    let mockRepository: OAuthMockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthFindClientByIdService,
                OAuthMockClientRepository,
                {
                    provide : OAuthIClientRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthFindClientByIdService);
        repository = module.get(OAuthIClientRepository);
        mockRepository = module.get(OAuthMockClientRepository);
    });

    describe('main', () =>
    {
        test('FindClientByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find client by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new OAuthClientId(oAuthMockClientData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { clients } from '@app/o-auth/client/infrastructure/mock/mock-client.data';
import { UpdateClientsService } from './update-clients.service';
import {
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientScopeOptions,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsActive,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt,
} from '../../domain/value-objects';
import { IClientRepository } from '../../domain/client.repository';
import { MockClientRepository } from '../../infrastructure/mock/mock-client.repository';

describe('UpdateClientsService', () =>
{
    let service: UpdateClientsService;
    let repository: IClientRepository;
    let mockRepository: MockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateClientsService,
                MockClientRepository,
                {
                    provide : IClientRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateClientsService);
        repository      = module.get(IClientRepository);
        mockRepository  = module.get(MockClientRepository);
    });

    describe('main', () =>
    {
        test('UpdateClientsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a clients and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new ClientId(clients[0].id),
                    grantType: new ClientGrantType(clients[0].grantType),
                    name: new ClientName(clients[0].name),
                    secret: new ClientSecret(clients[0].secret),
                    authUrl: new ClientAuthUrl(clients[0].authUrl),
                    redirect: new ClientRedirect(clients[0].redirect),
                    scopeOptions: new ClientScopeOptions(clients[0].scopeOptions),
                    expiredAccessToken: new ClientExpiredAccessToken(clients[0].expiredAccessToken),
                    expiredRefreshToken: new ClientExpiredRefreshToken(clients[0].expiredRefreshToken),
                    isActive: new ClientIsActive(clients[0].isActive),
                    isMaster: new ClientIsMaster(clients[0].isMaster),
                    applicationIds: new ClientApplicationIds(clients[0].applicationIds),
                },
            )).toBe(undefined);
        });
    });
});
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIApplicationClientRepository, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthCreateApplicationsClientsService } from '@app/o-auth/application-client/application/create/o-auth-create-applications-clients.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationsClientsService', () =>
{
    let service: OAuthCreateApplicationsClientsService;
    let mockRepository: OAuthMockApplicationClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateApplicationsClientsService,
                OAuthMockApplicationClientRepository,
                {
                    provide : OAuthIApplicationClientRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthCreateApplicationsClientsService);
        mockRepository = module.get(OAuthMockApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('CreateApplicationsClientsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create applicationsClients and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});

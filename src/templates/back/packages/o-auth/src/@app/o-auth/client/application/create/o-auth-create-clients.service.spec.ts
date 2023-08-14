/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthCreateClientsService } from './o-auth-create-clients.service';
import { OAuthIClientRepository } from '../../domain/o-auth-client.repository';
import { OAuthMockClientRepository } from '../../infrastructure/mock/o-auth-mock-client.repository';

describe('OAuthCreateClientsService', () =>
{
    let service: OAuthCreateClientsService;
    let mockRepository: OAuthMockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateClientsService,
                OAuthMockClientRepository,
                {
                    provide : OAuthIClientRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthCreateClientsService);
        mockRepository = module.get(OAuthMockClientRepository);
    });

    describe('main', () =>
    {
        test('CreateClientsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create clients and emit event', async () =>
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

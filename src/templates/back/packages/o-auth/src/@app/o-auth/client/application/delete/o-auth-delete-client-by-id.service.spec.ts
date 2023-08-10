/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockClientData } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.data';
import { OAuthDeleteClientByIdService } from './o-auth-delete-client-by-id.service';
import { OAuthClientId } from '../../domain/value-objects';
import { OAuthIClientRepository } from '../../domain/o-auth-client.repository';
import { OAuthMockClientRepository } from '../../infrastructure/mock/o-auth-mock-client.repository';

describe('OAuthDeleteClientByIdService', () =>
{
    let service: OAuthDeleteClientByIdService;
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
                OAuthDeleteClientByIdService,
                OAuthMockClientRepository,
                {
                    provide : OAuthIClientRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthDeleteClientByIdService);
        repository = module.get(OAuthIClientRepository);
        mockRepository = module.get(OAuthMockClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete client and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new OAuthClientId(oAuthMockClientData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

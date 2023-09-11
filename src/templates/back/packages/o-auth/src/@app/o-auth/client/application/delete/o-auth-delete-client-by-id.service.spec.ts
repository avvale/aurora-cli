/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIClientRepository, oAuthMockClientData, OAuthMockClientRepository } from '@app/o-auth/client';
import { OAuthDeleteClientByIdService } from '@app/o-auth/client/application/delete/o-auth-delete-client-by-id.service';
import { OAuthClientId } from '@app/o-auth/client/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

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

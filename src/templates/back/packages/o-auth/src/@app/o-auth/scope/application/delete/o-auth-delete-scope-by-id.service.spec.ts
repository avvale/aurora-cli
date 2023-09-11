/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIScopeRepository, oAuthMockScopeData, OAuthMockScopeRepository } from '@app/o-auth/scope';
import { OAuthDeleteScopeByIdService } from '@app/o-auth/scope/application/delete/o-auth-delete-scope-by-id.service';
import { OAuthScopeId } from '@app/o-auth/scope/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteScopeByIdService', () =>
{
    let service: OAuthDeleteScopeByIdService;
    let repository: OAuthIScopeRepository;
    let mockRepository: OAuthMockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthDeleteScopeByIdService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthDeleteScopeByIdService);
        repository = module.get(OAuthIScopeRepository);
        mockRepository = module.get(OAuthMockScopeRepository);
    });

    describe('main', () =>
    {
        test('OAuthDeleteScopeByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete scope and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new OAuthScopeId(oAuthMockScopeData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

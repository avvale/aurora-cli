/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthIScopeRepository,
    OAuthMockScopeRepository,
} from '@app/o-auth/scope';
import { OAuthDeleteScopesService } from '@app/o-auth/scope/application/delete/o-auth-delete-scopes.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteScopesService', () => {
    let service: OAuthDeleteScopesService;
    let repository: OAuthIScopeRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthDeleteScopesService,
                OAuthMockScopeRepository,
                {
                    provide: OAuthIScopeRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthDeleteScopesService);
        repository = module.get(OAuthIScopeRepository);
    });

    describe('main', () => {
        test('OAuthDeleteScopesService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete scope and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});

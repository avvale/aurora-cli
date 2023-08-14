/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockScopeData } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.data';
import { OAuthUpdateScopesService } from './o-auth-update-scopes.service';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from '../../domain/value-objects';
import { OAuthIScopeRepository } from '../../domain/o-auth-scope.repository';
import { OAuthMockScopeRepository } from '../../infrastructure/mock/o-auth-mock-scope.repository';

describe('OAuthUpdateScopesService', () =>
{
    let service: OAuthUpdateScopesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpdateScopesService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpdateScopesService);
    });

    describe('main', () =>
    {
        test('UpdateScopesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a scopes and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new OAuthScopeId(oAuthMockScopeData[0].id),
                        code: new OAuthScopeCode(oAuthMockScopeData[0].code),
                        name: new OAuthScopeName(oAuthMockScopeData[0].name),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

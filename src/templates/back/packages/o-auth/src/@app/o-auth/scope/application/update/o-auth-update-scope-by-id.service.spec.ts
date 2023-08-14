/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockScopeData } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.data';
import { OAuthUpdateScopeByIdService } from './o-auth-update-scope-by-id.service';
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

describe('OAuthUpdateScopeByIdService', () =>
{
    let service: OAuthUpdateScopeByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpdateScopeByIdService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpdateScopeByIdService);
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopeByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a scope and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new OAuthScopeId(oAuthMockScopeData[0].id),
                        code: new OAuthScopeCode(oAuthMockScopeData[0].code),
                        name: new OAuthScopeName(oAuthMockScopeData[0].name),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

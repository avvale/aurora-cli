/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockScopeData } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.data';
import { OAuthCreateScopeService } from './o-auth-create-scope.service';
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

describe('OAuthCreateScopeService', () =>

{
    let service: OAuthCreateScopeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateScopeService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthCreateScopeService);
    });

    describe('main', () =>
    {
        test('OAuthCreateScopeService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a scope and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new OAuthScopeId(oAuthMockScopeData[0].id),
                        code: new OAuthScopeCode(oAuthMockScopeData[0].code),
                        name: new OAuthScopeName(oAuthMockScopeData[0].name),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});

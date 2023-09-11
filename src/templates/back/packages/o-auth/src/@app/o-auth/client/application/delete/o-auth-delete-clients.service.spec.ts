/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIClientRepository, OAuthMockClientRepository } from '@app/o-auth/client';
import { OAuthDeleteClientsService } from '@app/o-auth/client/application/delete/o-auth-delete-clients.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteClientsService', () =>
{
    let service: OAuthDeleteClientsService;
    let repository: OAuthIClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthDeleteClientsService,
                OAuthMockClientRepository,
                {
                    provide : OAuthIClientRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthDeleteClientsService);
        repository = module.get(OAuthIClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete client and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

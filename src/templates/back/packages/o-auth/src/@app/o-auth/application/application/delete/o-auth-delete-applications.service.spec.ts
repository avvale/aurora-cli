/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIApplicationRepository, OAuthMockApplicationRepository } from '@app/o-auth/application';
import { OAuthDeleteApplicationsService } from '@app/o-auth/application/application/delete/o-auth-delete-applications.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationsService', () =>
{
    let service: OAuthDeleteApplicationsService;
    let repository: OAuthIApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthDeleteApplicationsService,
                OAuthMockApplicationRepository,
                {
                    provide : OAuthIApplicationRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthDeleteApplicationsService);
        repository = module.get(OAuthIApplicationRepository);
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete application and emit event', async () =>
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accessTokens } from '@app/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { DeleteAccessTokenByIdService } from './delete-access-token-by-id.service';
import { AccessTokenId } from '../../domain/value-objects';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { MockAccessTokenRepository } from '../../infrastructure/mock/mock-access-token.repository';

describe('DeleteAccessTokenByIdService', () =>
{
    let service: DeleteAccessTokenByIdService;
    let repository: IAccessTokenRepository;
    let mockRepository: MockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAccessTokenByIdService,
                MockAccessTokenRepository,
                {
                    provide : IAccessTokenRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(DeleteAccessTokenByIdService);
        repository      = module.get(IAccessTokenRepository);
        mockRepository  = module.get(MockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('DeleteAccessTokenByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete accessToken and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AccessTokenId(accessTokens[0].id),
            )).toBe(undefined);
        });
    });
});
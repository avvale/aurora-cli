import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { FindAccessTokenByIdService } from './find-access-token-by-id.service';
import { AccessTokenId } from '../../domain/value-objects';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { MockAccessTokenRepository } from '../../infrastructure/mock/mock-access-token.repository';

describe('FindAccessTokenByIdService', () =>
{
    let service: FindAccessTokenByIdService;
    let repository: IAccessTokenRepository;
    let mockRepository: MockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAccessTokenByIdService,
                MockAccessTokenRepository,
                {
                    provide : IAccessTokenRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(FindAccessTokenByIdService);
        repository      = module.get(IAccessTokenRepository);
        mockRepository  = module.get(MockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('FindAccessTokenByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find accessToken by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AccessTokenId(accessTokens[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
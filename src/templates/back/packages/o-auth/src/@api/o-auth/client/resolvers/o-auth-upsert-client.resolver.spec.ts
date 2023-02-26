/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpsertClientResolver } from './o-auth-upsert-client.resolver';
import { OAuthUpsertClientHandler } from '../handlers/o-auth-upsert-client.handler';
import { OAuthUpdateClientByIdInput } from '@api/graphql';

// sources
import { clients } from '@app/o-auth/client/infrastructure/mock/mock-client.data';

describe('OAuthUpsertClientResolver', () =>
{
    let resolver: OAuthUpsertClientResolver;
    let handler: OAuthUpsertClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpsertClientResolver,
                {
                    provide : OAuthUpsertClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpsertClientResolver>(OAuthUpsertClientResolver);
        handler = module.get<OAuthUpsertClientHandler>(OAuthUpsertClientHandler);
    });

    test('OAuthUpsertClientResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpsertClientResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an client upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(<OAuthUpdateClientByIdInput>clients[0])).toBe(clients[0]);
        });
    });
});
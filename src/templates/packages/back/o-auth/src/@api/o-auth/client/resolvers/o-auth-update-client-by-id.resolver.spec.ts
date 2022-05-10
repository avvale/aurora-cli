/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateClientByIdResolver } from './o-auth-update-client-by-id.resolver';
import { OAuthUpdateClientByIdHandler } from '../handlers/o-auth-update-client-by-id.handler';
import { OAuthUpdateClientByIdInput } from '../../../../graphql';

// sources
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthUpdateClientByIdResolver', () =>
{
    let resolver: OAuthUpdateClientByIdResolver;
    let handler: OAuthUpdateClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateClientByIdResolver,
                {
                    provide : OAuthUpdateClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateClientByIdResolver>(OAuthUpdateClientByIdResolver);
        handler = module.get<OAuthUpdateClientByIdHandler>(OAuthUpdateClientByIdHandler);
    });

    test('OAuthUpdateClientByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a client by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(<OAuthUpdateClientByIdInput>clients[0])).toBe(clients[0]);
        });
    });
});
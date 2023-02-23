/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateTenantsResolver } from './iam-update-tenants.resolver';
import { IamUpdateTenantsHandler } from '../handlers/iam-update-tenants.handler';
import { IamUpdateTenantsInput } from '@api/graphql';

// sources
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamUpdateTenantsResolver', () =>
{
    let resolver: IamUpdateTenantsResolver;
    let handler: IamUpdateTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateTenantsResolver,
                {
                    provide : IamUpdateTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateTenantsResolver>(IamUpdateTenantsResolver);
        handler = module.get<IamUpdateTenantsHandler>(IamUpdateTenantsHandler);
    });

    test('IamUpdateTenantsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateTenantsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a tenants updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main(<IamUpdateTenantsInput>tenants[0])).toBe(tenants[0]);
        });
    });
});
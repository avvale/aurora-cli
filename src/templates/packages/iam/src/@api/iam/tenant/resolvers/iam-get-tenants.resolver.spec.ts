/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetTenantsResolver } from './iam-get-tenants.resolver';
import { IamGetTenantsHandler } from '../handlers/iam-get-tenants.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamGetTenantsResolver', () =>
{
    let resolver: IamGetTenantsResolver;
    let handler: IamGetTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetTenantsResolver,
                {
                    provide : IamGetTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamGetTenantsResolver>(IamGetTenantsResolver);
        handler = module.get<IamGetTenantsHandler>(IamGetTenantsHandler);
    });

    test('IamGetTenantsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetTenantsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a tenants', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants)));
            expect(await resolver.main()).toBe(tenants);
        });
    });
});
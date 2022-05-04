/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateBoundedContextResolver } from './iam-update-bounded-context.resolver';
import { IamUpdateBoundedContextHandler } from '../handlers/iam-update-bounded-context.handler';
import { IamUpdateBoundedContextInput } from '../../../../graphql';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamUpdateBoundedContextResolver', () =>
{
    let resolver: IamUpdateBoundedContextResolver;
    let handler: IamUpdateBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateBoundedContextResolver,
                {
                    provide : IamUpdateBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateBoundedContextResolver>(IamUpdateBoundedContextResolver);
        handler = module.get<IamUpdateBoundedContextHandler>(IamUpdateBoundedContextHandler);
    });

    test('IamUpdateBoundedContextResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateBoundedContextResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a boundedContext created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main(<IamUpdateBoundedContextInput>boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});
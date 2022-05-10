/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateBoundedContextsResolver } from './iam-update-bounded-contexts.resolver';
import { IamUpdateBoundedContextsHandler } from '../handlers/iam-update-bounded-contexts.handler';
import { IamUpdateBoundedContextsInput } from '../../../../graphql';

// sources
import { boundedContexts } from '@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamUpdateBoundedContextsResolver', () =>
{
    let resolver: IamUpdateBoundedContextsResolver;
    let handler: IamUpdateBoundedContextsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateBoundedContextsResolver,
                {
                    provide : IamUpdateBoundedContextsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateBoundedContextsResolver>(IamUpdateBoundedContextsResolver);
        handler = module.get<IamUpdateBoundedContextsHandler>(IamUpdateBoundedContextsHandler);
    });

    test('IamUpdateBoundedContextsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateBoundedContextsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a boundedContexts updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main(<IamUpdateBoundedContextsInput>boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});
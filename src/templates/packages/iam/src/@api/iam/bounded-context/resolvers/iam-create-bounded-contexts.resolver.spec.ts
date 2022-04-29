import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateBoundedContextsResolver } from './iam-create-bounded-contexts.resolver';
import { IamCreateBoundedContextsHandler } from '../handlers/iam-create-bounded-contexts.handler';
import { IamCreateBoundedContextInput } from '../../../../graphql';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamCreateBoundedContextsResolver', () =>
{
    let resolver: IamCreateBoundedContextsResolver;
    let handler: IamCreateBoundedContextsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateBoundedContextsResolver,
                {
                    provide : IamCreateBoundedContextsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateBoundedContextsResolver>(IamCreateBoundedContextsResolver);
        handler = module.get<IamCreateBoundedContextsHandler>(IamCreateBoundedContextsHandler);
    });

    test('IamCreateBoundedContextsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContexts created', async () =>
        {
            expect(await resolver.main(<IamCreateBoundedContextInput[]>boundedContexts)).toBe(undefined);
        });
    });
});
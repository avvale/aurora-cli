/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateBoundedContextResolver } from './iam-create-bounded-context.resolver';
import { IamCreateBoundedContextHandler } from '../handlers/iam-create-bounded-context.handler';
import { IamCreateBoundedContextInput } from '../../../../graphql';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamCreateBoundedContextResolver', () =>
{
    let resolver: IamCreateBoundedContextResolver;
    let handler: IamCreateBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreateBoundedContextResolver,
                {
                    provide : IamCreateBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateBoundedContextResolver>(IamCreateBoundedContextResolver);
        handler = module.get<IamCreateBoundedContextHandler>(IamCreateBoundedContextHandler);
    });

    test('IamCreateBoundedContextResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContext created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main(<IamCreateBoundedContextInput>boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});
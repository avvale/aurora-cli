/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindBoundedContextResolver } from './iam-find-bounded-context.resolver';
import { IamFindBoundedContextHandler } from '../handlers/iam-find-bounded-context.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamFindBoundedContextResolver', () =>
{
    let resolver: IamFindBoundedContextResolver;
    let handler: IamFindBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindBoundedContextResolver,
                {
                    provide : IamFindBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindBoundedContextResolver>(IamFindBoundedContextResolver);
        handler = module.get<IamFindBoundedContextHandler>(IamFindBoundedContextHandler);
    });

    test('IamFindBoundedContextResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindBoundedContextResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a boundedContext', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main()).toBe(boundedContexts[0]);
        });
    });
});
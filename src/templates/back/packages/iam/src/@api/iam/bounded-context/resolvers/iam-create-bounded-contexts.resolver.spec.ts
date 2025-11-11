import { IamCreateBoundedContextInput } from '@api/graphql';
import {
    IamCreateBoundedContextsHandler,
    IamCreateBoundedContextsResolver,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateBoundedContextsResolver', () => {
    let resolver: IamCreateBoundedContextsResolver;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateBoundedContextsResolver,
                {
                    provide: IamCreateBoundedContextsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateBoundedContextsResolver>(
            IamCreateBoundedContextsResolver,
        );
    });

    test('IamCreateBoundedContextsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamCreateBoundedContextsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContexts created', async () => {
            expect(
                await resolver.main(
                    <IamCreateBoundedContextInput[]>iamMockBoundedContextData,
                ),
            ).toBe(undefined);
        });
    });
});

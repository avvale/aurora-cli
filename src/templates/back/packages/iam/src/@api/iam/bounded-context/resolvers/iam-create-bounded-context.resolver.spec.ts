/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateBoundedContextInput } from '@api/graphql';
import {
    IamCreateBoundedContextHandler,
    IamCreateBoundedContextResolver,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateBoundedContextResolver', () => {
    let resolver: IamCreateBoundedContextResolver;
    let handler: IamCreateBoundedContextHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamCreateBoundedContextResolver,
                {
                    provide: IamCreateBoundedContextHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateBoundedContextResolver>(
            IamCreateBoundedContextResolver,
        );
        handler = module.get<IamCreateBoundedContextHandler>(
            IamCreateBoundedContextHandler,
        );
    });

    test('IamCreateBoundedContextResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamCreateBoundedContextResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContext created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockBoundedContextData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <IamCreateBoundedContextInput>iamMockBoundedContextData[0],
                ),
            ).toBe(iamMockBoundedContextData[0]);
        });
    });
});

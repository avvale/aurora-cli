import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AnyScalar, JsonScalar, UploadScalar } from 'aurora-ts-core';
import { Hello } from './hello.resolver';
import GraphQLJSON from 'graphql-type-json';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver    : ApolloDriver,
            context   : ({ req }) => ({ req }),
            debug     : true,
            playground: true,
            typePaths : ['./**/*.graphql'],
            resolvers : {
                JSON: GraphQLJSON // define JSON Scalar type
            },
            definitions: {
                path: join(process.cwd(), 'graphql.ts'),
            },
            /* uploads: {
                maxFileSize: 100000000, // 100 MB
                maxFiles   : 5,
            } */
        }),
    ],
    providers: [
        AnyScalar,
        UploadScalar,
        JsonScalar,
        Hello,
    ],
    exports: [
        GraphQLModule,
    ],
})
export class GraphQLConfigModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AnyScalar, JsonScalar, UploadScalar } from '@aurorajs.dev/core';
import { Hello } from './hello.resolver';
import GraphQLJSON from 'graphql-type-json';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver    : ApolloDriver,
            imports   : [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                context   : ({ req }) => ({ req }),
                debug     : configService.get('GRAPHQL_DEBUG') === 'true',
                playground: configService.get('GRAPHQL_PLAYGROUND') === 'true',
                typePaths : ['./**/*.graphql'],
                resolvers : {
                    JSON: GraphQLJSON, // define JSON Scalar type
                },
                definitions: configService.get('GRAPHQL_CREATE_DEFINITIONS') === 'true' ?  {
                    path: join(process.cwd(), 'src/@api/graphql.ts'),
                } : undefined,
                /* uploads: {
                    maxFileSize: 100000000, // 100 MB
                    maxFiles   : 5,
                } */
            }),
            inject: [ConfigService],
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

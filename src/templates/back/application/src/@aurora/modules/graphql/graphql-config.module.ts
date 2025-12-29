import { AnyScalar, JsonScalar, UploadScalar } from '@aurorajs.dev/core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { join } from 'path';
import { Hello } from './hello.resolver';
import { SchemaStoreModule } from './schema-store.module';
import { SchemaStoreService } from './schema-store.service';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            imports: [ConfigModule, SchemaStoreModule],
            inject: [ConfigService, SchemaStoreService],
            useFactory: (
                configService: ConfigService,
                schemaStoreService: SchemaStoreService,
            ) => ({
                context: ({ req }) => ({ req }),
                debug: configService.get('GRAPHQL_DEBUG') === 'true',
                playground: configService.get('GRAPHQL_PLAYGROUND') === 'true',
                typePaths: ['./**/*.graphql'],
                resolvers: {
                    JSON: GraphQLJSON, // define JSON Scalar type
                },
                definitions:
                    configService.get('GRAPHQL_CREATE_DEFINITIONS') === 'true'
                        ? {
                              path: join(
                                  process.cwd(),
                                  configService.get('GRAPHQL_TYPE_PATH'),
                              ),
                          }
                        : undefined,
                transformSchema: (schema: GraphQLSchema) => {
                    schemaStoreService.load(schema);
                    return schema;
                },
            }),
        }),
    ],
    providers: [AnyScalar, UploadScalar, JsonScalar, Hello],
    exports: [GraphQLModule],
})
export class GraphQLConfigModule {}

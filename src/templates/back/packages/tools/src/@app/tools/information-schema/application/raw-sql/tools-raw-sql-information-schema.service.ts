import { ToolsInformationSchemaSqlRequest, ToolsSequelizeInformationSchemaRepository } from '@app/tools/information-schema';
import {
    ToolsInformationSchemaRawSql,
} from '@app/tools/information-schema/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsRawSQLInformationSchemaService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsSequelizeInformationSchemaRepository,
    ) {}

    async main(
        payload: {
            rawSQL: ToolsInformationSchemaRawSql;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const informationSchema = ToolsInformationSchemaSqlRequest.register(
            payload.rawSQL,
        );

        await this.repository.rawSQL({
            rawSQL: payload.rawSQL.value,
            cQMetadata,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const informationSchemaRegister = this.publisher.mergeObjectContext(
            informationSchema,
        );

        informationSchemaRegister.created({
            payload: informationSchema,
            cQMetadata,
        }); // apply event to model events
        informationSchemaRegister.commit(); // commit all events of model
    }
}

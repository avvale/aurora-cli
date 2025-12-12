import {
    ToolsInformationSchemaResponse,
    ToolsInformationSchemaSqlResponse,
} from '@app/tools/information-schema';
import { ToolsInformationSchemaValue } from '@app/tools/information-schema/domain/value-objects';
import { CQMetadata, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class ToolsInformationSchemaMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param procedure
     */
    mapModelToAggregate(
        procedure: LiteralObject,
        cQMetadata?: CQMetadata,
    ): ToolsInformationSchemaSqlResponse {
        if (!procedure) return;

        return this.makeAggregate(procedure, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param procedures
     */
    mapModelsToAggregates(
        sqlResponse: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): ToolsInformationSchemaSqlResponse {
        if (!Array.isArray(sqlResponse)) return;

        return ToolsInformationSchemaSqlResponse.register(
            new ToolsInformationSchemaValue(sqlResponse, { undefinable: true }),
        );
    }

    /**
     * Map aggregate to response
     * @param procedure
     */
    mapAggregateToResponse(
        sqlResponse: ToolsInformationSchemaSqlResponse,
    ): ToolsInformationSchemaResponse {
        return this.makeResponse(sqlResponse);
    }

    /**
     * Map array of aggregates to array responses
     * @param procedures
     */
    mapAggregatesToResponses(
        sqlResponse: ToolsInformationSchemaSqlResponse,
    ): ToolsInformationSchemaResponse {
        return this.makeResponse(sqlResponse);
    }

    private makeAggregate(
        informationSchema: LiteralObject,
        cQMetadata?: CQMetadata,
    ): ToolsInformationSchemaSqlResponse {
        return ToolsInformationSchemaSqlResponse.register(
            new ToolsInformationSchemaValue(informationSchema, {
                undefinable: true,
            }),
        );
    }

    private makeResponse(
        sqlResponse: ToolsInformationSchemaSqlResponse,
    ): ToolsInformationSchemaResponse {
        if (!sqlResponse) return null;

        return new ToolsInformationSchemaResponse(sqlResponse.value.value);
    }
}

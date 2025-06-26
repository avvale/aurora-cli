import { ToolsSequelizeInformationSchemaRepository, ToolsInformationSchemaSqlResponse } from '@app/tools/information-schema';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsRawSQLInformationSchemasService
{
    constructor(
        private readonly repository: ToolsSequelizeInformationSchemaRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<ToolsInformationSchemaSqlResponse>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        }) as unknown as ToolsInformationSchemaSqlResponse;
    }
}

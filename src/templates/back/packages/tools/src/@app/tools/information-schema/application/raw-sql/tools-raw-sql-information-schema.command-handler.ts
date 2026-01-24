import { ToolsRawSQLInformationSchemaCommand } from '@app/tools/information-schema';
import { ToolsRawSQLInformationSchemaService } from '@app/tools/information-schema/application/raw-sql/tools-raw-sql-information-schema.service';
import { ToolsInformationSchemaRawSql } from '@app/tools/information-schema/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsRawSQLInformationSchemaCommand)
export class ToolsRawSQLInformationSchemaCommandHandler
  implements ICommandHandler<ToolsRawSQLInformationSchemaCommand>
{
  constructor(
    private readonly rawSQLInformationSchemaService: ToolsRawSQLInformationSchemaService,
  ) {}

  async execute(command: ToolsRawSQLInformationSchemaCommand): Promise<void> {
    await this.rawSQLInformationSchemaService.main(
      {
        rawSQL: new ToolsInformationSchemaRawSql(command.payload.rawSQL),
      },
      command.cQMetadata,
    );
  }
}

import { ToolsCreateProceduresCommand, ToolsGetProceduresQuery } from '@app/tools/procedure';
import { Encrypt, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { procedures } from 'src/assets/tools/procedures';

@Injectable()
export class ToolsLoadProceduresService
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async onApplicationBootstrap(): Promise<void>
    {
        // get all procedures
        const proceduresInDatabase = await this.queryBus.ask(new ToolsGetProceduresQuery());

        const proceduresToStorage = [];
        for (const procedure of procedures)
        {
            const procedureInDatabase = proceduresInDatabase.find(procedureInDatabase => procedureInDatabase.id === procedure.id);

            if (procedureInDatabase)
            {
                proceduresToStorage.push({
                    ...procedureInDatabase,
                    name      : procedure.name,
                    type      : procedure.type,
                    version   : procedure.version,
                    upScript  : procedure.upScript,
                    downScript: procedure.downScript,
                    sort      : procedure.sort,
                    hash      : `sha1:${Encrypt.sha1(procedure.upScript)}`,
                    isUpdated : procedureInDatabase.isExecuted &&
                        procedureInDatabase.hash &&
                        `sha1:${Encrypt.sha1(procedure.upScript)}` !== procedureInDatabase.hash ?
                        true : procedureInDatabase.isUpdated,
                });
            }
            else
            {
                proceduresToStorage.push({
                    ...procedure,
                    isActive  : false,
                    isExecuted: false,
                    isUpdated : false,
                    hash      : `sha1:${Encrypt.sha1(procedure.upScript)}`,
                });
            }
        }

        await this.commandBus.dispatch(new ToolsCreateProceduresCommand(
            proceduresToStorage,
            {
                repositoryOptions: {
                    updateOnDuplicate: ['name', 'type', 'version', 'upScript', 'downScript', 'sort', 'hash', 'isUpdated'],
                },
            },
        ));
    }
}

import { ToolsGetProceduresQuery } from '@app/tools/procedure';
import { getPackageFile, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { ModuleRef } from '@nestjs/core';
import * as semver from 'semver';

export const checkProcedureExecutions = async (
    moduleRef: ModuleRef,
): Promise<void> =>
{
    const queryBus = moduleRef.get(IQueryBus, { strict: false });
    const commandBus = moduleRef.get(ICommandBus, { strict: false });

    const procedures = await queryBus.ask(new ToolsGetProceduresQuery(
        {
            where: {
                isActive : true,
                isUpdated: true,
            },
        },
    ));

    const packageFile = getPackageFile();
    const proceduresInVersion = procedures.filter(procedure => semver.lte(procedure.version, packageFile.version));

    for (const procedure of proceduresInVersion)
    {
        // eslint-disable-next-line no-await-in-loop
       //  await commandBus.dispatch(new ToolsRawSQLProcedureCommand(procedure.upScript));
    }
};
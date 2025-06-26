import { toolsMockProcedureData, ToolsProcedure } from '@app/tools/procedure';
import {
    ToolsProcedureCheckedAt,
    ToolsProcedureCreatedAt,
    ToolsProcedureDeletedAt,
    ToolsProcedureDownScript,
    ToolsProcedureExecutedAt,
    ToolsProcedureId,
    ToolsProcedureIsActive,
    ToolsProcedureIsInstalled,
    ToolsProcedureIsUpdated,
    ToolsProcedureName,
    ToolsProcedureSort,
    ToolsProcedureType,
    ToolsProcedureUpdatedAt,
    ToolsProcedureUpScript,
    ToolsProcedureVersion,
} from '@app/tools/procedure/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class ToolsMockProcedureSeeder extends MockSeeder<ToolsProcedure>
{
    public collectionSource: ToolsProcedure[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const procedure of _.orderBy(toolsMockProcedureData, ['id']))
        {
            this.collectionSource.push(
                ToolsProcedure.register(
                    new ToolsProcedureId(procedure.id),
                    new ToolsProcedureName(procedure.name),
                    new ToolsProcedureType(procedure.type),
                    new ToolsProcedureVersion(procedure.version),
                    new ToolsProcedureIsActive(procedure.isActive),
                    new ToolsProcedureIsInstalled(procedure.isInstalled),
                    new ToolsProcedureIsUpdated(procedure.isUpdated),
                    new ToolsProcedureUpScript(procedure.upScript),
                    new ToolsProcedureDownScript(procedure.downScript),
                    new ToolsProcedureSort(procedure.sort),
                    new ToolsProcedureExecutedAt(procedure.executedAt),
                    new ToolsProcedureCheckedAt(procedure.checkedAt),
                    new ToolsProcedureCreatedAt({ currentTimestamp: true }),
                    new ToolsProcedureUpdatedAt({ currentTimestamp: true }),
                    new ToolsProcedureDeletedAt(null),
                ),
            );
        }
    }
}

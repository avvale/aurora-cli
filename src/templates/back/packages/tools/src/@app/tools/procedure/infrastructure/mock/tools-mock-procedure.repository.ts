import { ToolsIProcedureRepository, toolsMockProcedureData, ToolsProcedure } from '@app/tools/procedure';
import {
    ToolsProcedureCheckedAt,
    ToolsProcedureCreatedAt,
    ToolsProcedureDeletedAt,
    ToolsProcedureDownScript,
    ToolsProcedureExecutedAt,
    ToolsProcedureHash,
    ToolsProcedureId,
    ToolsProcedureIsActive,
    ToolsProcedureIsExecuted,
    ToolsProcedureIsUpdated,
    ToolsProcedureName,
    ToolsProcedureSort,
    ToolsProcedureType,
    ToolsProcedureUpdatedAt,
    ToolsProcedureUpScript,
    ToolsProcedureVersion,
} from '@app/tools/procedure/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsMockProcedureRepository extends MockRepository<ToolsProcedure> implements ToolsIProcedureRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'ToolsProcedure';
    public collectionSource: ToolsProcedure[];

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>toolsMockProcedureData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(ToolsProcedure.register(
                new ToolsProcedureId(itemCollection.id),
                new ToolsProcedureName(itemCollection.name),
                new ToolsProcedureType(itemCollection.type),
                new ToolsProcedureVersion(itemCollection.version),
                new ToolsProcedureIsActive(itemCollection.isActive),
                new ToolsProcedureIsExecuted(itemCollection.isExecuted),
                new ToolsProcedureIsUpdated(itemCollection.isUpdated),
                new ToolsProcedureUpScript(itemCollection.upScript),
                new ToolsProcedureDownScript(itemCollection.downScript),
                new ToolsProcedureSort(itemCollection.sort),
                new ToolsProcedureHash(itemCollection.hash),
                new ToolsProcedureExecutedAt(itemCollection.executedAt),
                new ToolsProcedureCheckedAt(itemCollection.checkedAt),
                new ToolsProcedureCreatedAt(itemCollection.createdAt),
                new ToolsProcedureUpdatedAt(itemCollection.updatedAt),
                new ToolsProcedureDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}

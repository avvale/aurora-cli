import { CommonAttachmentLibrary, CommonAttachmentLibraryMapper, CommonAttachmentLibraryModel, CommonIAttachmentLibraryRepository } from '@app/common/attachment-library';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommonSequelizeAttachmentLibraryRepository extends SequelizeRepository<CommonAttachmentLibrary, CommonAttachmentLibraryModel> implements CommonIAttachmentLibraryRepository
{
    public readonly aggregateName: string = 'CommonAttachmentLibrary';
    public readonly mapper: CommonAttachmentLibraryMapper = new CommonAttachmentLibraryMapper();

    constructor(
        @InjectModel(CommonAttachmentLibraryModel)
        public readonly repository: typeof CommonAttachmentLibraryModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}

/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpsertLangCommand } from './common-upsert-lang.command';
import { CommonUpsertLangService } from './common-upsert-lang.service';
import {
    CommonLangId,
    CommonLangName,
    CommonLangImage,
    CommonLangIso6392,
    CommonLangIso6393,
    CommonLangIetf,
    CommonLangCustomCode,
    CommonLangDir,
    CommonLangSort,
    CommonLangIsActive,
    CommonLangCreatedAt,
    CommonLangUpdatedAt,
    CommonLangDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CommonUpsertLangCommand)
export class CommonUpsertLangCommandHandler implements ICommandHandler<CommonUpsertLangCommand>
{
    constructor(
        private readonly upsertLangService: CommonUpsertLangService,
    ) {}

    async execute(command: CommonUpsertLangCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertLangService.main(
            {
                id: new CommonLangId(command.payload.id),
                name: new CommonLangName(command.payload.name),
                image: new CommonLangImage(command.payload.image),
                iso6392: new CommonLangIso6392(command.payload.iso6392),
                iso6393: new CommonLangIso6393(command.payload.iso6393),
                ietf: new CommonLangIetf(command.payload.ietf),
                customCode: new CommonLangCustomCode(command.payload.customCode),
                dir: new CommonLangDir(command.payload.dir),
                sort: new CommonLangSort(command.payload.sort),
                isActive: new CommonLangIsActive(command.payload.isActive),
            },
            command.cQMetadata,
        );
    }
}

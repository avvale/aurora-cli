/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLangCommand } from './create-lang.command';
import { CreateLangService } from './create-lang.service';
import {
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangCustomCode,
    LangDir,
    LangSort,
    LangIsActive,
    LangCreatedAt,
    LangUpdatedAt,
    LangDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateLangCommand)
export class CreateLangCommandHandler implements ICommandHandler<CreateLangCommand>
{
    constructor(
        private readonly createLangService: CreateLangService,
    ) {}

    async execute(command: CreateLangCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createLangService.main(
            {
                id: new LangId(command.payload.id),
                name: new LangName(command.payload.name),
                image: new LangImage(command.payload.image),
                iso6392: new LangIso6392(command.payload.iso6392),
                iso6393: new LangIso6393(command.payload.iso6393),
                ietf: new LangIetf(command.payload.ietf),
                customCode: new LangCustomCode(command.payload.customCode),
                dir: new LangDir(command.payload.dir),
                sort: new LangSort(command.payload.sort),
                isActive: new LangIsActive(command.payload.isActive),
            },
            command.cQMetadata,
        );
    }
}
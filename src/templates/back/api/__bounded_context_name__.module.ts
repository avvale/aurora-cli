import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../{{ config.auroraLocalPackage }}/shared.module';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([])
    ],
    controllers: [],
    providers: [],
})
export class {{ toPascalCase schema.boundedContextName }}Module {}

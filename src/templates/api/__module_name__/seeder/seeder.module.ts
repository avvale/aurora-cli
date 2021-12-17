import { Module } from '@nestjs/common';
import { SharedModule } from '../../../../{{ config.auroraLocalPackage }}/shared.module';
import { SequelizeConfigModule } from '{{ config.auroraCorePackage }}';
import { {{ toPascalCase schema.boundedContextName }}Module } from 'src/{{ config.apiContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.boundedContextName }}.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        {{ toPascalCase schema.boundedContextName }}Module
    ]
})
export class SeederModule {}
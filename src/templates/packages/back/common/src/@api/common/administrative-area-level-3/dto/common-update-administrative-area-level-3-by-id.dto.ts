/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateAdministrativeAreaLevel3ByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'countryId [input here api field description]',
        example    : 'bf6e1c11-1533-4465-b396-d9077ab27218',
    })
    countryId?: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel1Id [input here api field description]',
        example    : '7732e640-4495-40c2-914f-59803f4b2d75',
    })
    administrativeAreaLevel1Id?: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel2Id [input here api field description]',
        example    : '5cc77052-8d8e-42d0-b305-1916248fb9f2',
    })
    administrativeAreaLevel2Id?: string;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code?: string;

    @ApiProperty({
        type       : String,
        description: 'customCode [input here api field description]',
    })
    customCode?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'slug [input here api field description]',
    })
    slug?: string;

    @ApiProperty({
        type       : Number,
        description: 'latitude [input here api field description]',
    })
    latitude?: number;

    @ApiProperty({
        type       : Number,
        description: 'longitude [input here api field description]',
    })
    longitude?: number;

    @ApiProperty({
        type       : Number,
        description: 'zoom [input here api field description]',
    })
    zoom?: number;

}
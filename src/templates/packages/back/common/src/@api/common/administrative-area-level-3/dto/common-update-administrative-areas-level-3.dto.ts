/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateAdministrativeAreasLevel3Dto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'countryId [input here api field description]',
        example    : '20d374b7-1473-4a4c-8dba-2a441edfce2f',
    })
    countryId?: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel1Id [input here api field description]',
        example    : '20eb170c-4e59-49e5-afbc-e41ee4786839',
    })
    administrativeAreaLevel1Id?: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel2Id [input here api field description]',
        example    : 'f36f5d1b-edf5-42c9-a882-aab92c0c7345',
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
/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonCountryMapType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateCountriesDto {
  @ApiProperty({
    type: String,
    description:
      'Unique identifier for the country. UUID v4 format, generated automatically on creation.',
  })
  id?: string;

  @ApiProperty({
    type: String,
    description:
      'ISO 3166-1 alpha-2 country code (two-letter code, e.g., &quot;US&quot;, &quot;GB&quot;, &quot;FR&quot;). Standard international identifier for countries. Indexed for efficient lookups.',
  })
  iso3166Alpha2?: string;

  @ApiProperty({
    type: String,
    description:
      'ISO 3166-1 alpha-3 country code (three-letter code, e.g., &quot;USA&quot;, &quot;GBR&quot;, &quot;FRA&quot;). Alternative standard identifier. Indexed for efficient lookups.',
  })
  iso3166Alpha3?: string;

  @ApiProperty({
    type: String,
    description:
      'ISO 3166-1 numeric country code (three-digit code, e.g., &quot;840&quot;, &quot;826&quot;, &quot;250&quot;). Numeric standard identifier. Stored as char to preserve leading zeros. Indexed for efficient lookups.',
  })
  iso3166Numeric?: string;

  @ApiProperty({
    type: String,
    description:
      'Optional custom code defined by the organization for internal identification. Can be used for legacy system integration or custom business logic. Indexed for efficient lookups.',
  })
  customCode?: string;

  @ApiProperty({
    type: String,
    description:
      'International dialing prefix for phone numbers (e.g., &quot;+1&quot;, &quot;+44&quot;, &quot;+33&quot;). Used for phone number validation and formatting. Maximum 5 characters.',
  })
  prefix?: string;

  @ApiProperty({
    type: String,
    description:
      'URL or path to country flag image or icon. Used for visual representation in UI. Maximum 1022 characters for long URLs.',
  })
  image?: string;

  @ApiProperty({
    type: Number,
    description:
      'Display order for country lists. Lower values appear first. NULL values typically sorted last or alphabetically. Used for prioritizing commonly selected countries.',
  })
  sort?: number;

  @ApiProperty({
    type: Object,
    description:
      'JSON structure defining the administrative divisions hierarchy for this country. Specifies how many levels exist and their names (e.g., state/county/city). Used to configure address forms dynamically.',
  })
  administrativeAreas?: any;

  @ApiProperty({
    type: Number,
    description:
      'Geographical latitude coordinate of the country&#x27;s center point. Precision of 14 decimal places allows sub-meter accuracy. Used for map visualization and initial map positioning.',
  })
  latitude?: number;

  @ApiProperty({
    type: Number,
    description:
      'Geographical longitude coordinate of the country&#x27;s center point. Precision of 14 decimal places allows sub-meter accuracy. Used for map visualization and initial map positioning.',
  })
  longitude?: number;

  @ApiProperty({
    type: Number,
    description:
      'Default zoom level for map display when viewing this country. Typical range: 1 (world view) to 21 (building level). Lower values for larger countries. Determines initial map scale in UI.',
  })
  zoom?: number;

  @ApiProperty({
    enum: CommonCountryMapType,
    description:
      'Preferred map visualization type for this country. ROADMAP: Street map view. SATELLITE: Aerial imagery. HYBRID: Satellite with road overlay. TERRAIN: Topographic relief map. NULL uses system default.',
    example: CommonCountryMapType.TERRAIN,
  })
  mapType?: CommonCountryMapType;

  @ApiProperty({
    type: Object,
    description:
      'Array of language IDs available for this country&#x27;s i18n content. Determines which translations are required and displayed. Used for filtering and validation of country translations.',
  })
  availableLangs?: any;

  @ApiProperty({
    type: String,
    description:
      'Foreign key to the language this translation is for. Combined with countryId forms unique constraint (one translation per language per country).',
    example: '53805b00-dfd2-5a5e-bc41-1ad8bf9722a5',
  })
  langId?: string;

  @ApiProperty({
    type: String,
    description:
      'Localized name of the country in the specified language (e.g., &quot;United States&quot; in English, &quot;États-Unis&quot; in French). Indexed for efficient searching and sorting.',
  })
  name?: string;

  @ApiProperty({
    type: String,
    description:
      'Localized URL-friendly identifier derived from the translated name. Lowercase, hyphenated format. Used for SEO-friendly multilingual URLs. Indexed for routing.',
  })
  slug?: string;

  @ApiProperty({
    type: String,
    description:
      'Localized label for administrative area level 1 in this country and language (e.g., &quot;State&quot; in English, &quot;État&quot; in French, &quot;Bundesland&quot; in German). Used for dynamic form labels.',
  })
  administrativeAreaLevel1?: string;

  @ApiProperty({
    type: String,
    description:
      'Localized label for administrative area level 2 in this country and language (e.g., &quot;County&quot; in English, &quot;Comté&quot; in French, &quot;Landkreis&quot; in German). Used for dynamic form labels.',
  })
  administrativeAreaLevel2?: string;

  @ApiProperty({
    type: String,
    description:
      'Localized label for administrative area level 3 in this country and language (e.g., &quot;City&quot; in English, &quot;Ville&quot; in French, &quot;Stadt&quot; in German). Used for dynamic form labels.',
  })
  administrativeAreaLevel3?: string;
}

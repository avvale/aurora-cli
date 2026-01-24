# Common

## Purpose

Shared infrastructure domain providing reusable entities for geographic data, internationalization, and file management. Contains foundational data structures used across all other bounded contexts including countries, languages, administrative areas, and attachment handling.

## Modules

| Module | Responsibility |
|--------|----------------|
| country | Geographic country data with ISO 3166 codes (alpha-2, alpha-3, numeric). Supports i18n with translations, map coordinates, and administrative area labels per locale. |
| lang | Language definitions with ISO 639 codes. Controls text direction (LTR/RTL), activation status, and serves as the reference for all i18n translations. |
| administrative-area-level-1 | First-level administrative divisions (states, provinces, regions). Linked to countries with geographic coordinates and map settings. |
| administrative-area-level-2 | Second-level administrative divisions (counties, districts). Hierarchically linked to level-1 areas. |
| administrative-area-level-3 | Third-level administrative divisions (municipalities, cities). Hierarchically linked to level-2 areas. |
| attachment | File attachments linked to any entity via attachableId (polymorphic). Stores file metadata, dimensions, URLs, and supports language-specific attachments. |
| attachment-family | Image processing configurations per resource. Defines dimensions, fit types (crop, width, height), quality, and output formats for automatic image resizing. |
| attachment-library | Centralized media library for reusable files. Stores original files that can be referenced by multiple attachments. |
| resource | Entity types that support attachments. Registry of resources with attachment capabilities for the attachment-family system. |

## Key Business Rules

- **ISO Standards**: Countries use ISO 3166, languages use ISO 639-2/3 and IETF codes for international compatibility.
- **i18n Support**: Countries have translatable names and slugs per language. Administrative area labels are localized.
- **Polymorphic Attachments**: Attachments link to any entity via attachableId without foreign key constraints.
- **Image Processing**: Attachment families define automatic transformations (resize, crop, format conversion) applied on upload.
- **Hierarchical Geography**: Administrative areas form a tree structure: Country -> Level1 -> Level2 -> Level3.

## Main Flows

1. **Country Lookup**: Query by ISO code -> Return country with i18n translations for requested language.
2. **File Upload**: Upload file -> Match to attachment-family by resource -> Apply transformations -> Store attachment with metadata.
3. **Image Resize**: Original uploaded -> Family config read -> Generate sizes defined in family.sizes -> Store all variants.
4. **Geographic Hierarchy**: Select country -> Load level-1 areas -> User selects -> Load level-2 -> Continue to level-3.

## Dependencies

- **Uses**: None (foundational domain)
- **Used by**: iam (user language preference), message (localized notifications), all bounded contexts (attachment system, geographic data)

## Technical Notes

- **Map Integration**: Countries and administrative areas store lat/lng/zoom/mapType for Google Maps integration.
- **Custom Codes**: Parallel to ISO codes, customCode fields allow organization-specific identifiers.
- **Fit Types**: FIT_CROP (exact dimensions), FIT_WIDTH (scale to width), FIT_HEIGHT (scale to height), *_FREE_CROP variants allow user-defined crop areas.
- **Soft Delete**: All entities support soft delete for data preservation.

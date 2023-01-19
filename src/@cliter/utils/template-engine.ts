
import * as handlebars from 'handlebars';
import * as handlebarsHelpers from 'handlebars-helpers';
import '../handlebars/helpers/is-allow-property';
import '../handlebars/helpers/bracket-close';
import '../handlebars/helpers/bracket-open';
import '../handlebars/helpers/calculate-form-group-col';
import '../handlebars/helpers/has-comma-in-validation-form-control';
import '../handlebars/helpers/has-items';
import '../handlebars/helpers/has-validation-form-control';
import '../handlebars/helpers/initial-form-group-data';
import '../handlebars/helpers/is-i18n-data-lang-property';
import '../handlebars/helpers/is-i18n-relation-property';
import '../handlebars/helpers/is-pivot-path';
import '../handlebars/helpers/is-undefined';
import '../handlebars/helpers/loops';
import '../handlebars/helpers/mocker';
import '../handlebars/helpers/nanoid';
import '../handlebars/helpers/not-in-array';
import '../handlebars/helpers/object';
import '../handlebars/helpers/postman-quotes';
import '../handlebars/helpers/random-decimal-digits';
import '../handlebars/helpers/random-integer-digits';
import '../handlebars/helpers/set-var';
import '../handlebars/helpers/string-to-camel-case';
import '../handlebars/helpers/string-to-kebab-case';
import '../handlebars/helpers/string-to-pascal-case';
import '../handlebars/helpers/string-to-snake-case';
import '../handlebars/helpers/uuid';
import '../handlebars/partials/declare-i18n-repository';
import '../handlebars/partials/i18n';
import '../handlebars/partials/import-i18n-repository';
import '../handlebars/partials/import-value-objects';
import '../handlebars/partials/inputs/boolean-input';
import '../handlebars/partials/inputs/char-input';
import '../handlebars/partials/inputs/date-input';
import '../handlebars/partials/inputs/enum-input';
import '../handlebars/partials/inputs/int-input';
import '../handlebars/partials/inputs/decimal-input';
import '../handlebars/partials/inputs/text-input';
import '../handlebars/partials/inputs/timestamp-input';
import '../handlebars/partials/inputs/varchar-input';
import '../handlebars/partials/many-to-many-array-items';
import '../prototypes/string-to-camel-case.interface';
import '../prototypes/string-to-camel-case';
import '../prototypes/string-to-kebab-case.interface';
import '../prototypes/string-to-kebab-case';
import '../prototypes/string-to-pascal-case.interface';
import '../prototypes/string-to-pascal-case';
import '../prototypes/string-to-snake-case.interface';
import '../prototypes/string-to-snake-case';

const templateEngine =
{
    /**
     * Render templates with handlebars template engine.
     * @param {string} content - Template content
     * @param {any} data - Data helper to render templates
     * @return {Promise<string>} Rendered template
     */
    async render(content: string, data: any): Promise<string>
    {
        // add helpers to handlebars template engine
        handlebarsHelpers({ handlebars });

        return handlebars.compile(content)(
            data,
            {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault   : true,
            },
        );
    },
};

export default templateEngine;

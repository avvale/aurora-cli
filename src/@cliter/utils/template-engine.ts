
import * as handlebars from 'handlebars';
import * as handlebarsHelpers from 'handlebars-helpers';
import '../handlebars/helpers';
import '../handlebars/partials';
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
     * @return {string} Rendered template
     */
    render(content: string, data: any): string
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

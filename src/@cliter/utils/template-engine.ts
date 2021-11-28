
import { Options } from 'ejs';
import * as ejs from 'ejs';
import * as handlebars from 'handlebars';
import * as handlebarsHelpers from 'handlebars-helpers';
import './../prototypes/string-to-kebab-case.interface';
import './../prototypes/string-to-kebab-case';
import './../prototypes/string-to-snake-case.interface';
import './../prototypes/string-to-snake-case';
import './../prototypes/string-to-camel-case.interface';
import './../prototypes/string-to-camel-case';
import './../prototypes/string-to-pascal-case.interface';
import './../prototypes/string-to-pascal-case';
import './../handlebars/helpers/allow-property';
import './../handlebars/helpers/is-i18n-relation-property';
import './../handlebars/partials/i18n';
import './../handlebars/partials/import-value-objects';
import './../handlebars/partials/declare-i18n-repository';
import './../handlebars/partials/import-i18n-repository';
import './../handlebars/helpers/string-to-camel-case';
import './../handlebars/helpers/string-to-kebab-case';
import './../handlebars/helpers/string-to-pascal-case';
import './../handlebars/helpers/string-to-snake-case';
import './../handlebars/helpers/has-items';
import './../handlebars/helpers/not-in-array';
import './../handlebars/helpers/faker';
import './../handlebars/helpers/faker-property';
import './../handlebars/helpers/set-var';
import './../handlebars/helpers/loops';

export class TemplateEngine
{
    /**
     * Render templates with handlebars template engine.
     * @param content
     * @param data
     * @param opts
     */
    static async render(content: string, data: any, opts: Options): Promise<string>
    {
        const ejsRendered = ejs.render(content, data, opts);

        // add helpers to handlebars template engine
        handlebarsHelpers({ handlebars });

        return handlebars.compile(ejsRendered)(data, {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault   : true,
        });
    }
}
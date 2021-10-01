declare interface Object
{
    byString(o: any, s: string): any;
}

/**
 * Convert a string to Kebab Case.
 *
 * @example
 * 'Foo Bar'.toSnakeCase()      // Will return `foo-bar`.
 * 'fooBar'.toSnakeCase()       // Will return `foo-bar`.
 * '--FOO-BAR--'.toSnakeCase()  // Will return `foo-bar`.
 *
 * @returns {string}
 *   The Kebab Case string.
 */
Object.prototype.byString = function(o: any, s: string): any
{
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}
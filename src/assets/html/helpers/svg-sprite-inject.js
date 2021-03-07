/* Хэлпер для вставки svg спрайта */
const Handlebars = require( 'handlebars/runtime' );

module.exports = function( compilation ) {
    const sprite = compilation.assets['sprite.svg'].source();
    return new Handlebars.SafeString( sprite );
};
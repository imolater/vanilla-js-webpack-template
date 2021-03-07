/**
 * Преобразует временную метку в выбранный формат.
 */
export function formatLocaleDate(
    timestamp,
    part,
    options,
    isUnix = true,
    locale = 'ru',
) {
    timestamp = isUnix ? ( timestamp * 1000 ) : timestamp;
    const date = new Date( timestamp );

    switch ( part ) {
        case 'full':
            return date.toLocaleString( locale, options );
        case 'date':
            return date.toLocaleDateString( locale, options );
        case 'time':
            return date.toLocaleTimeString( locale, options );
        default:
            return date;
    }
}

/**
 * Очищает текст от спец. символов
 *
 * Внутри использует функцию объекта DOM, поэтому данный метод подходит
 * только для клиентской части.
 */
export function stripHtmlTags( text ) {
    const document = new DOMParser().parseFromString( text, 'text/html' );
    return document.body.textContent || '';
}

/**
 * Кодирует объект с данными в GET-параметры
 */
export function encodeToUriParams( data ) {
    let params = '';

    for ( const [ key, value ] of Object.entries( data ) ) {
        params += ( params === '' ) ? '?' : '&';
        params += key + '=' + encodeURIComponent( value );
    }

    return params;
}

export function createUiComponents( selector, Component, options = {} ) {
    document
        .querySelectorAll( selector )
        .forEach( item => new Component( item, options ) );
}
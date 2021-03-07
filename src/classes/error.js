/**
 * Базовый класс ошибок
 */
class CustomError extends Error {
    constructor( message ) {
        super( message );
        this.name = this.constructor.name;
        this.message = `${ this.name }: ${ this.message }`;
    }
}

/**
 * Класс ошибок сетевых запросов
 */
export class RequestError extends CustomError {
    constructor( statusCode, statusText ) {
        super( `${ statusCode } ${ statusText }` );
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}

/**
 * Класс ошибок обращения к API
 */
export class ApiError extends CustomError {
    constructor( message ) {
        super( message );
        this.message = message;
    }
}

/**
 * Класс ошибок валидации
 */
export class ValidationError extends CustomError {}
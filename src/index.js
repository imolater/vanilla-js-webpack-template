import '@/assets/scss/main.scss';
import '@/assets/scss/vendors/index.scss';
import '@/plugins/svg-import';
import '@/behaviors/hello-world';
import { createUiComponents } from '@/classes/utility';
import { HelloWorld }         from '@/components/hello-world';

function init() {
    try {
        createUiComponents( '.hello-world', HelloWorld );
    } catch ( e ) {
        console.log( e.message );
    }
}

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', init );
} else {
    init();
}

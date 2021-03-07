const handler = function( event ) {
    const { target } = event;
    const closest = target.closest( '[data-behaviour=hello-world]' );

    if ( !closest || !target.contains( closest ) ) return;

    const result = confirm( 'Hello world from behaviour! Do you want to delete this handler?' );

    if ( result ) {
        document.removeEventListener( 'mouseover', handler );
    }
};

document.addEventListener( 'mouseover', handler );
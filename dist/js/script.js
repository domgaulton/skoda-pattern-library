if ( $('[data-bg-image]').length || $('[data-bg-image-dark-dark]').length || $('[data-bg-image-dark-light]').length ) {
	$('[data-bg-image]').each(function() {
		var src = $(this).attr('data-bg-image');
		$(this).css('background-image','url('+src+')');
	});

	$('[data-bg-image-dark-light]').each(function() {
		var src = $(this).attr('data-bg-image-dark-light');
		$(this).css('background-image','linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('+src+')');
	});

    $('[data-bg-image-dark-dark]').each(function() {
    var src = $(this).attr('data-bg-image-dark-dark');
    $(this).css('background-image','linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url('+src+')');
  });
};
/*!
 * Flickity PACKAGED v2.1.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'jquery-bridget/jquery-bridget',[ 'jquery' ], function( jQuery ) {
      return factory( window, jQuery );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('jquery')
    );
  } else {
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  }

}( window, function factory( window, jQuery ) {
'use strict';

// ----- utils ----- //

var arraySlice = Array.prototype.slice;

// helper function for logging errors
// $.error breaks jQuery chaining
var console = window.console;
var logError = typeof console == 'undefined' ? function() {} :
  function( message ) {
    console.error( message );
  };

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) {
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) {
    return;
  }

  // add option method -> $().plugin('option', {...})
  if ( !PluginClass.prototype.option ) {
    // option setter
    PluginClass.prototype.option = function( opts ) {
      // bail out if not an object
      if ( !$.isPlainObject( opts ) ){
        return;
      }
      this.options = $.extend( true, this.options, opts );
    };
  }

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0 /*, arg1 */ ) {
    if ( typeof arg0 == 'string' ) {
      // method call $().plugin( 'methodName', { options } )
      // shift arguments by 1
      var args = arraySlice.call( arguments, 1 );
      return methodCall( this, arg0, args );
    }
    // just $().plugin({ options })
    plainCall( this, arg0 );
    return this;
  };

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) {
    var returnValue;
    var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

    $elems.each( function( i, elem ) {
      // get instance
      var instance = $.data( elem, namespace );
      if ( !instance ) {
        logError( namespace + ' not initialized. Cannot call methods, i.e. ' +
          pluginMethodStr );
        return;
      }

      var method = instance[ methodName ];
      if ( !method || methodName.charAt(0) == '_' ) {
        logError( pluginMethodStr + ' is not a valid method' );
        return;
      }

      // apply method, get return value
      var value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
    });

    return returnValue !== undefined ? returnValue : $elems;
  }

  function plainCall( $elems, options ) {
    $elems.each( function( i, elem ) {
      var instance = $.data( elem, namespace );
      if ( instance ) {
        // set options & init
        instance.option( options );
        instance._init();
      } else {
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
      }
    });
  }

  updateJQuery( $ );

}

// ----- updateJQuery ----- //

// set $.bridget for v1 backwards compatibility
function updateJQuery( $ ) {
  if ( !$ || ( $ && $.bridget ) ) {
    return;
  }
  $.bridget = jQueryBridget;
}

updateJQuery( jQuery || window.jQuery );

// -----  ----- //

return jQueryBridget;

}));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false, console: false */

( function( window, factory ) {
  'use strict';

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'get-size/get-size',[],function() {
      return factory();
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See http://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );

  getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize( style.width ) == 200;
  body.removeChild( div );

}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'desandro-matches-selector/matches-selector',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {



var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/cell',[
      'get-size/get-size'
    ], function( getSize ) {
      return factory( window, getSize );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory(
      window,
      window.getSize
    );
  }

}( window, function factory( window, getSize ) {



function Cell( elem, parent ) {
  this.element = elem;
  this.parent = parent;

  this.create();
}

var proto = Cell.prototype;

proto.create = function() {
  this.element.style.position = 'absolute';
  this.element.setAttribute( 'aria-selected', 'false' );
  this.x = 0;
  this.shift = 0;
};

proto.destroy = function() {
  // reset style
  this.element.style.position = '';
  var side = this.parent.originSide;
  this.element.removeAttribute('aria-selected');
  this.element.style[ side ] = '';
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.setPosition = function( x ) {
  this.x = x;
  this.updateTarget();
  this.renderPosition( x );
};

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function() {
  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
  this.target = this.x + this.size[ marginProperty ] +
    this.size.width * this.parent.cellAlign;
};

proto.renderPosition = function( x ) {
  // render position of cell with in slider
  var side = this.parent.originSide;
  this.element.style[ side ] = this.parent.getPositionValue( x );
};

/**
 * @param {Integer} factor - 0, 1, or -1
**/
proto.wrapShift = function( shift ) {
  this.shift = shift;
  this.renderPosition( this.x + this.parent.slideableWidth * shift );
};

proto.remove = function() {
  this.element.parentNode.removeChild( this.element );
};

return Cell;

}));

// slide
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/slide',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( window, function factory() {
'use strict';

function Slide( parent ) {
  this.parent = parent;
  this.isOriginLeft = parent.originSide == 'left';
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

var proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length == 1 ) {
    this.x = cell.x; // x comes from first cell
    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
    this.firstMargin = cell.size[ beginMargin ];
  }
};

proto.updateTarget = function() {
  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
  var lastCell = this.getLastCell();
  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.changeSelected( true );
};

proto.unselect = function() {
  this.changeSelected( false );
};

proto.changeSelected = function( isSelected ) {
  var classMethod = isSelected ? 'add' : 'remove';
  this.cells.forEach( function( cell ) {
    cell.element.classList[ classMethod ]('is-selected');
    cell.element.setAttribute( 'aria-selected', isSelected.toString() );
  });
};

proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

return Slide;

}));

// animate
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/animate',[
      'fizzy-ui-utils/utils'
    ], function( utils ) {
      return factory( window, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory(
      window,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, utils ) {



// -------------------------- animate -------------------------- //

var proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) {
    return;
  }

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  var previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) {
    var _this = this;
    requestAnimationFrame( function animateFrame() {
      _this.animate();
    });
  }
};

proto.positionSlider = function() {
  var x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) {
    x = utils.modulo( x, this.slideableWidth );
    x = x - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  x = x + this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft ? -x : x;
  var value = this.getPositionValue( x );
  // use 3D tranforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = this.isAnimating ?
    'translate3d(' + value + ',0,0)' : 'translateX(' + value + ')';

  // scroll event
  var firstSlide = this.slides[0];
  if ( firstSlide ) {
    var positionX = -this.x - firstSlide.target;
    var progress = positionX / this.slidesWidth;
    this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
  }
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) {
    return;
  }
  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';
  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) {
    this.restingFrames++;
  }
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  var beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    var cellShift = gap > 0 ? shift : 0;
    cell.wrapShift( cellShift );
    gap -= cell.size.outerWidth;
  }
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) {
    return;
  }
  for ( var i=0; i < cells.length; i++ ) {
    cells[i].wrapShift( 0 );
  }
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isDraggable || !this.isPointerDown ) {
    return;
  }
  // change the position to drag position by applying force
  var dragVelocity = this.dragX - this.x;
  var dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no slides
  var dragDown = this.isDraggable && this.isPointerDown;
  if ( dragDown || this.isFreeScrolling || !this.slides.length ) {
    return;
  }
  var distance = this.selectedSlide.target * -1 - this.x;
  var force = distance * this.options.selectedAttraction;
  this.applyForce( force );
};

return proto;

}));

// Flickity main
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/flickity',[
      'ev-emitter/ev-emitter',
      'get-size/get-size',
      'fizzy-ui-utils/utils',
      './cell',
      './slide',
      './animate'
    ], function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
      return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./cell'),
      require('./slide'),
      require('./animate')
    );
  } else {
    // browser global
    var _Flickity = window.Flickity;

    window.Flickity = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      _Flickity.Cell,
      _Flickity.Slide,
      _Flickity.animatePrototype
    );
  }

}( window, function factory( window, EvEmitter, getSize,
  utils, Cell, Slide, animatePrototype ) {



// vars
var jQuery = window.jQuery;
var getComputedStyle = window.getComputedStyle;
var console = window.console;

function moveElements( elems, toElem ) {
  elems = utils.makeArray( elems );
  while ( elems.length ) {
    toElem.appendChild( elems.shift() );
  }
}

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Flickity intances
var instances = {};

function Flickity( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) {
    var instance = instances[ this.element.flickityGUID ];
    instance.option( options );
    return instance;
  }

  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }
  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // kick things off
  this._create();
}

Flickity.defaults = {
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true
  // watchCSS: false,
  // wrapAround: false
};

// hash of methods triggered on _create()
Flickity.createMethods = [];

var proto = Flickity.prototype;
// inherit EventEmitter
utils.extend( proto, EvEmitter.prototype );

proto._create = function() {
  // add id for Flickity.data
  var id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.originSide = this.options.rightToLeft ? 'right' : 'left';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();

  if ( this.options.resize || this.options.watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  // add listeners from on option
  for ( var eventName in this.options.on ) {
    var listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  }

  Flickity.createMethods.forEach( function( method ) {
    this[ method ]();
  }, this );

  if ( this.options.watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }

};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) {
    return;
  }
  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  var cellElems = this._filterFindCellElements( this.element.children );
  moveElements( cellElems, this.slider );
  this.viewport.appendChild( this.slider );
  this.element.appendChild( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');

  var index;
  var initialIndex = this.options.initialIndex;
  if ( this.isInitActivated ) {
    index = this.selectedIndex;
  } else if ( initialIndex !== undefined ) {
    index = this.cells[ initialIndex ] ? initialIndex : 0;
  } else {
    index = 0;
  }
  // select instantly
  this.select( index, false, true );
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
};

// slider positions the cells
proto._createSlider = function() {
  // slider element does all the positioning
  var slider = document.createElement('div');
  slider.className = 'flickity-slider';
  slider.style[ this.originSide ] = 0;
  this.slider = slider;
};

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) {
  var cellElems = this._filterFindCellElements( elems );

  // create new Flickity for collection
  var cells = cellElems.map( function( cellElem ) {
    return new Cell( cellElem, this );
  }, this );

  return cells;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.getLastSlide = function() {
  return this.slides[ this.slides.length - 1 ];
};

// positions all cells
proto.positionCells = function() {
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
};

/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */
proto._positionCells = function( index ) {
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  var cellX = 0;
  // get cellX
  if ( index > 0 ) {
    var startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  }
  var len = this.cells.length;
  for ( var i=index; i < len; i++ ) {
    var cell = this.cells[i];
    cell.setPosition( cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  }
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
};

/**
 * cell.getSize() on multiple cells
 * @param {Array} cells
 */
proto._sizeCells = function( cells ) {
  cells.forEach( function( cell ) {
    cell.getSize();
  });
};

// --------------------------  -------------------------- //

proto.updateSlides = function() {
  this.slides = [];
  if ( !this.cells.length ) {
    return;
  }

  var slide = new Slide( this );
  this.slides.push( slide );
  var isOriginLeft = this.originSide == 'left';
  var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

  var canCellFit = this._getCanCellFit();

  this.cells.forEach( function( cell, i ) {
    // just add cell if first cell in slide
    if ( !slide.cells.length ) {
      slide.addCell( cell );
      return;
    }

    var slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ nextMargin ] );

    if ( canCellFit.call( this, i, slideWidth ) ) {
      slide.addCell( cell );
    } else {
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( this );
      this.slides.push( slide );
      slide.addCell( cell );
    }
  }, this );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
};

proto._getCanCellFit = function() {
  var groupCells = this.options.groupCells;
  if ( !groupCells ) {
    return function() {
      return false;
    };
  } else if ( typeof groupCells == 'number' ) {
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    var number = parseInt( groupCells, 10 );
    return function( i ) {
      return ( i % number ) !== 0;
    };
  }
  // default, group by width of slide
  // parse '75%
  var percentMatch = typeof groupCells == 'string' &&
    groupCells.match(/^(\d+)%$/);
  var percent = percentMatch ? parseInt( percentMatch[1], 10 ) / 100 : 1;
  return function( i, slideWidth ) {
    return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
  };
};

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() {
  this.positionCells();
  this.positionSliderAtSelected();
};

proto.getSize = function() {
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
};

var cellAlignShorthands = {
  // cell align, then based on origin side
  center: {
    left: 0.5,
    right: 0.5
  },
  left: {
    left: 0,
    right: 1
  },
  right: {
    right: 0,
    left: 1
  }
};

proto.setCellAlign = function() {
  var shorthand = cellAlignShorthands[ this.options.cellAlign ];
  this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
};

proto.setGallerySize = function() {
  if ( this.options.setGallerySize ) {
    var height = this.options.adaptiveHeight && this.selectedSlide ?
      this.selectedSlide.height : this.maxCellHeight;
    this.viewport.style.height = height + 'px';
  }
};

proto._getWrapShiftCells = function() {
  // only for wrap-around
  if ( !this.options.wrapAround ) {
    return;
  }
  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  var gapX = this.cursorPosition;
  var cellIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  gapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
};

proto._getGapCells = function( gapX, cellIndex, increment ) {
  // keep adding cells until the cover the initial gap
  var cells = [];
  while ( gapX > 0 ) {
    var cell = this.cells[ cellIndex ];
    if ( !cell ) {
      break;
    }
    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  }
  return cells;
};

// ----- contain ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() {
  if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) {
    return;
  }
  var isRightToLeft = this.options.rightToLeft;
  var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
  var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
  var contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
  // content is less than gallery size
  var isContentSmaller = contentWidth < this.size.innerWidth;
  // bounds
  var beginBound = this.cursorPosition + this.cells[0].size[ beginMargin ];
  var endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
  // contain each cell target
  this.slides.forEach( function( slide ) {
    if ( isContentSmaller ) {
      // all cells fit inside gallery
      slide.target = contentWidth * this.cellAlign;
    } else {
      // contain to bounds
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
    }
  }, this );
};

// -----  ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) {
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    var $event = type;
    if ( event ) {
      // create jQuery event
      var jQEvent = jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
    }
    this.$element.trigger( $event, args );
  }
};

// -------------------------- select -------------------------- //

/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) {
  if ( !this.isActive ) {
    return;
  }
  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.options.wrapAround || isWrap ) {
    index = utils.modulo( index, this.slides.length );
  }
  // bail if invalid index
  if ( !this.slides[ index ] ) {
    return;
  }
  var prevIndex = this.selectedIndex;
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) {
    this.positionSliderAtSelected();
  } else {
    this.startAnimation();
  }
  if ( this.options.adaptiveHeight ) {
    this.setGallerySize();
  }
  // events
  this.dispatchEvent( 'select', null, [ index ] );
  // change event if new index
  if ( index != prevIndex ) {
    this.dispatchEvent( 'change', null, [ index ] );
  }
  // old v1 event name, remove in v3
  this.dispatchEvent('cellSelect');
};

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) {
  var len = this.slides.length;
  var isWrapping = this.options.wrapAround && len > 1;
  if ( !isWrapping ) {
    return index;
  }
  var wrapIndex = utils.modulo( index, len );
  // go to shortest
  var delta = Math.abs( wrapIndex - this.selectedIndex );
  var backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
  var forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
  if ( !this.isDragSelect && backWrapDelta < delta ) {
    index += len;
  } else if ( !this.isDragSelect && forewardWrapDelta < delta ) {
    index -= len;
  }
  // wrap position so slider is within normal area
  if ( index < 0 ) {
    this.x -= this.slideableWidth;
  } else if ( index >= len ) {
    this.x += this.slideableWidth;
  }
};

proto.previous = function( isWrap, isInstant ) {
  this.select( this.selectedIndex - 1, isWrap, isInstant );
};

proto.next = function( isWrap, isInstant ) {
  this.select( this.selectedIndex + 1, isWrap, isInstant );
};

proto.updateSelectedSlide = function() {
  var slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) {
    return;
  }
  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  // Remove in v3?
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
};

proto.unselectSelectedSlide = function() {
  if ( this.selectedSlide ) {
    this.selectedSlide.unselect();
  }
};

/**
 * select slide from number or cell element
 * @param {Element or Number} elem
 */
proto.selectCell = function( value, isWrap, isInstant ) {
  // get cell
  var cell = this.queryCell( value );
  if ( !cell ) {
    return;
  }

  var index = this.getCellSlideIndex( cell );
  this.select( index, isWrap, isInstant );
};

proto.getCellSlideIndex = function( cell ) {
  // get index of slides that has cell
  for ( var i=0; i < this.slides.length; i++ ) {
    var slide = this.slides[i];
    var index = slide.cells.indexOf( cell );
    if ( index != -1 ) {
      return i;
    }
  }
};

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem
 * @returns {Flickity.Cell} item
 */
proto.getCell = function( elem ) {
  // loop through cells to get the one that matches
  for ( var i=0; i < this.cells.length; i++ ) {
    var cell = this.cells[i];
    if ( cell.element == elem ) {
      return cell;
    }
  }
};

/**
 * get collection of Flickity.Cells, given Elements
 * @param {Element, Array, NodeList} elems
 * @returns {Array} cells - Flickity.Cells
 */
proto.getCells = function( elems ) {
  elems = utils.makeArray( elems );
  var cells = [];
  elems.forEach( function( elem ) {
    var cell = this.getCell( elem );
    if ( cell ) {
      cells.push( cell );
    }
  }, this );
  return cells;
};

/**
 * get cell elements
 * @returns {Array} cellElems
 */
proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

/**
 * get parent cell from an element
 * @param {Element} elem
 * @returns {Flickit.Cell} cell
 */
proto.getParentCell = function( elem ) {
  // first check if elem is cell
  var cell = this.getCell( elem );
  if ( cell ) {
    return cell;
  }
  // try to get parent cell elem
  elem = utils.getParent( elem, '.flickity-slider > *' );
  return this.getCell( elem );
};

/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) {
  if ( !adjCount ) {
    return this.selectedSlide.getCellElements();
  }
  index = index === undefined ? this.selectedIndex : index;

  var len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) {
    return this.getCellElements();
  }

  var cellElems = [];
  for ( var i = index - adjCount; i <= index + adjCount ; i++ ) {
    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
    var slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

/**
 * select slide from number or cell element
 * @param {Element, Selector String, or Number} selector
 */
proto.queryCell = function( selector ) {
  if ( typeof selector == 'number' ) {
    // use number as index
    return this.cells[ selector ];
  }
  if ( typeof selector == 'string' ) {
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  }
  // get cell from element
  return this.getCell( selector );
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

proto.childUIPointerDown = function( event ) {
  this.emitEvent( 'childUIPointerDown', [ event ] );
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  if ( !this.isActive ) {
    return;
  }
  this.getSize();
  // wrap values
  if ( this.options.wrapAround ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  var selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  var watchOption = this.options.watchCSS;
  if ( !watchOption ) {
    return;
  }

  var afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.indexOf('flickity') != -1 ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  // only work if element is in focus
  var isNotFocused = document.activeElement && document.activeElement != this.element;
  if ( !this.options.accessibility ||isNotFocused ) {
    return;
  }

  var handler = Flickity.keyboardHandlers[ event.keyCode ];
  if ( handler ) {
    handler.call( this );
  }
};

Flickity.keyboardHandlers = {
  // left arrow
  37: function() {
    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this.uiChange();
    this[ leftMethod ]();
  },
  // right arrow
  39: function() {
    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this.uiChange();
    this[ rightMethod ]();
  },
};

// ----- focus ----- //

proto.focus = function() {
  var prevScrollY = window.pageYOffset;
  this.element.focus();
  // hack to fix scroll jump after focus, #76
  if ( window.pageYOffset != prevScrollY ) {
    window.scrollTo( window.pageXOffset, prevScrollY );
  }
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) {
    return;
  }
  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( function( cell ) {
    cell.destroy();
  });
  this.element.removeChild( this.viewport );
  // move child elements back into element
  moveElements( this.slider.children, this.element );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

utils.extend( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {Element} elem
 * @returns {Flickity}
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.flickityGUID;
  return id && instances[ id ];
};

utils.htmlInit( Flickity, 'flickity' );

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'flickity', Flickity );
}

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) {
  jQuery = jq;
};

Flickity.Cell = Cell;

return Flickity;

}));

/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'unipointer/unipointer',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {



function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd - remove if falsey
 */
proto._bindStartEvent = function( elem, isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

  // default to mouse events
  var startEvent = 'mousedown';
  if ( window.PointerEvent ) {
    // Pointer Events
    startEvent = 'pointerdown';
  } else if ( 'ontouchstart' in window ) {
    // Touch Events. iOS Safari
    startEvent = 'touchstart';
  }
  elem[ bindMethod ]( startEvent, this );
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss right click and other pointers
  // button = 0 is okay, 1-4 not
  if ( event.button || this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  this._pointerReset();
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto._pointerReset = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'unidragger/unidragger',[
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {



// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */
proto._bindHandles = function( isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = touchAction;
    }
  }
};

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }
  // track start event position
  this.pointerDownPointer = pointer;

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) {
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) {
    this._pointerReset();
  }
  return isOkay;
};

// kludge to blur previously focused input
proto.pointerDownBlur = function() {
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) {
    focused.blur();
  }
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

// drag
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/drag',[
      './flickity',
      'unidragger/unidragger',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unidragger, utils ) {
      return factory( window, Flickity, Unidragger, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unidragger'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.Unidragger,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unidragger, utils ) {



// ----- defaults ----- //

utils.extend( Flickity.defaults, {
  draggable: '>1',
  dragThreshold: 3,
});

// ----- create ----- //

Flickity.createMethods.push('_createDrag');

// -------------------------- drag prototype -------------------------- //

var proto = Flickity.prototype;
utils.extend( proto, Unidragger.prototype );
proto._touchActionValue = 'pan-y';

// --------------------------  -------------------------- //

var isTouch = 'createTouch' in document;
var isTouchmoveScrollCanceled = false;

proto._createDrag = function() {
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'childUIPointerDown', this._childUIPointerDownDrag );
  this.on( 'deactivate', this.unbindDrag );
  this.on( 'cellChange', this.updateDraggable );
  // TODO updateDraggable on resize? if groupCells & slides change
  // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
  // #457, RubaXa/Sortable#973
  if ( isTouch && !isTouchmoveScrollCanceled ) {
    window.addEventListener( 'touchmove', function() {});
    isTouchmoveScrollCanceled = true;
  }
};

proto.onActivateDrag = function() {
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
};

proto.onDeactivateDrag = function() {
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
};

proto.updateDraggable = function() {
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable == '>1' ) {
    this.isDraggable = this.slides.length > 1;
  } else {
    this.isDraggable = this.options.draggable;
  }
  if ( this.isDraggable ) {
    this.element.classList.add('is-draggable');
  } else {
    this.element.classList.remove('is-draggable');
  }
};

// backwards compatibility
proto.bindDrag = function() {
  this.options.draggable = true;
  this.updateDraggable();
};

proto.unbindDrag = function() {
  this.options.draggable = false;
  this.updateDraggable();
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

proto._childUIPointerDownDrag = function( event ) {
  // allow focus & preventDefault even when not draggable
  // so child UI elements keep focus on carousel. #721
  event.preventDefault();
  this.pointerDownFocus( event );
};

// -------------------------- pointer events -------------------------- //

proto.pointerDown = function( event, pointer ) {
  if ( !this.isDraggable ) {
    this._pointerDownDefault( event, pointer );
    return;
  }
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }

  this._pointerDownPreventDefault( event );
  this.pointerDownFocus( event );
  // blur
  if ( document.activeElement != this.element ) {
    // do not blur if already focused
    this.pointerDownBlur();
  }

  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );

  this._pointerDownDefault( event, pointer );
};

// default pointerDown logic, used for staticClick
proto._pointerDownDefault = function( event, pointer ) {
  // track start event position
  this.pointerDownPointer = pointer;
  // bind move and end events
  this._bindPostStartEvents( event );
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

var focusNodes = {
  INPUT: true,
  TEXTAREA: true,
  SELECT: true,
};

proto.pointerDownFocus = function( event ) {
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isFocusNode ) {
    this.focus();
  }
};

proto._pointerDownPreventDefault = function( event ) {
  var isTouchStart = event.type == 'touchstart';
  var isTouchPointer = event.pointerType == 'touch';
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) {
    event.preventDefault();
  }
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.pointerUp = function( event, pointer ) {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

proto.pointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.dragStart = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  this.dragStartPosition = this.x;
  this.startAnimation();
  window.removeEventListener( 'scroll', this );
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
};

proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isDraggable ) {
    return;
  }
  event.preventDefault();

  this.previousDragX = this.dragX;
  // reverse if right-to-left
  var direction = this.options.rightToLeft ? -1 : 1;
  if ( this.options.wrapAround ) {
    // wrap around move. #589
    moveVector.x = moveVector.x % this.slideableWidth;
  }
  var dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.options.wrapAround && this.slides.length ) {
    // slow drag
    var originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    var endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  }

  this.dragX = dragX;

  this.dragMoveTime = new Date();
  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

proto.dragEnd = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  if ( this.options.freeScroll ) {
    this.isFreeScrolling = true;
  }
  // set selectedIndex based on where flick will end up
  var index = this.dragEndRestingSelect();

  if ( this.options.freeScroll && !this.options.wrapAround ) {
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    var restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  } else if ( !this.options.freeScroll && index == this.selectedIndex ) {
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  }
  delete this.previousDragX;
  // apply selection
  // TODO refactor this, selecting here feels weird
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.options.wrapAround;
  this.select( index );
  delete this.isDragSelect;
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

proto.dragEndRestingSelect = function() {
  var restingX = this.getRestingPosition();
  // how far away from selected slide
  var distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  var positiveResting = this._getClosestResting( restingX, distance, 1 );
  var negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  var index = positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
  return index;
};

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */
proto._getClosestResting = function( restingX, distance, increment ) {
  var index = this.selectedIndex;
  var minDistance = Infinity;
  var condition = this.options.contain && !this.options.wrapAround ?
    // if contain, keep going if distance is equal to minDistance
    function( d, md ) { return d <= md; } : function( d, md ) { return d < md; };
  while ( condition( distance, minDistance ) ) {
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) {
      break;
    }
    distance = Math.abs( distance );
  }
  return {
    distance: minDistance,
    // selected was previous index
    index: index - increment
  };
};

/**
 * measure distance between x and a slide target
 * @param {Number} x
 * @param {Integer} index - slide index
 */
proto.getSlideDistance = function( x, index ) {
  var len = this.slides.length;
  // wrap around if at least 2 slides
  var isWrapAround = this.options.wrapAround && len > 1;
  var slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  var slide = this.slides[ slideIndex ];
  if ( !slide ) {
    return null;
  }
  // add distance for wrap-around slides
  var wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
  return x - ( slide.target + wrap );
};

proto.dragEndBoostSelect = function() {
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) {
    return 0;
  }

  var distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  var delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) {
    // boost to next if moving towards the right, and positive velocity
    return 1;
  } else if ( distance < 0 && delta < 0 ) {
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  }
  return 0;
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  // get clickedCell, if cell was clicked
  var clickedCell = this.getParentCell( event.target );
  var cellElem = clickedCell && clickedCell.element;
  var cellIndex = clickedCell && this.cells.indexOf( clickedCell );
  this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
};

// ----- scroll ----- //

proto.onscroll = function() {
  var scroll = getScrollPosition();
  var scrollMoveX = this.pointerDownScroll.x - scroll.x;
  var scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
    this._pointerDone();
  }
};

// ----- utils ----- //

function getScrollPosition() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}

// -----  ----- //

return Flickity;

}));

/*!
 * Tap listener v2.0.0
 * listens to taps
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false*/ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'tap-listener/tap-listener',[
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.TapListener = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {



// --------------------------  TapListener -------------------------- //

function TapListener( elem ) {
  this.bindTap( elem );
}

// inherit Unipointer & EventEmitter
var proto = TapListener.prototype = Object.create( Unipointer.prototype );

/**
 * bind tap event to element
 * @param {Element} elem
 */
proto.bindTap = function( elem ) {
  if ( !elem ) {
    return;
  }
  this.unbindTap();
  this.tapElement = elem;
  this._bindStartEvent( elem, true );
};

proto.unbindTap = function() {
  if ( !this.tapElement ) {
    return;
  }
  this._bindStartEvent( this.tapElement, true );
  delete this.tapElement;
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  var pointerPoint = Unipointer.getPointerPoint( pointer );
  var boundingRect = this.tapElement.getBoundingClientRect();
  var scrollX = window.pageXOffset;
  var scrollY = window.pageYOffset;
  // calculate if pointer is inside tapElement
  var isInside = pointerPoint.x >= boundingRect.left + scrollX &&
    pointerPoint.x <= boundingRect.right + scrollX &&
    pointerPoint.y >= boundingRect.top + scrollY &&
    pointerPoint.y <= boundingRect.bottom + scrollY;
  // trigger callback if pointer is inside element
  if ( isInside ) {
    this.emitEvent( 'tap', [ event, pointer ] );
  }

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    var _this = this;
    setTimeout( function() {
      delete _this.isIgnoringMouseUp;
    }, 400 );
  }
};

proto.destroy = function() {
  this.pointerDone();
  this.unbindTap();
};

// -----  ----- //

return TapListener;

}));

// prev/next buttons
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/prev-next-button',[
      './flickity',
      'tap-listener/tap-listener',
      'fizzy-ui-utils/utils'
    ], function( Flickity, TapListener, utils ) {
      return factory( window, Flickity, TapListener, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('tap-listener'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.TapListener,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, TapListener, utils ) {
'use strict';

var svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( direction, parent ) {
  this.direction = direction;
  this.parent = parent;
  this._create();
}

PrevNextButton.prototype = Object.create( TapListener.prototype );

PrevNextButton.prototype._create = function() {
  // properties
  this.isEnabled = true;
  this.isPrevious = this.direction == -1;
  var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
  this.isLeft = this.direction == leftDirection;

  var element = this.element = document.createElement('button');
  element.className = 'flickity-button flickity-prev-next-button';
  element.className += this.isPrevious ? ' previous' : ' next';
  // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  // init as disabled
  this.disable();

  element.setAttribute( 'aria-label', this.isPrevious ? 'Previous' : 'Next' );

  // create arrow
  var svg = this.createSVG();
  element.appendChild( svg );
  // events
  this.on( 'tap', this.onTap );
  this.parent.on( 'select', this.update.bind( this ) );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PrevNextButton.prototype.activate = function() {
  this.bindTap( this.element );
  // click events from keyboard
  this.element.addEventListener( 'click', this );
  // add to DOM
  this.parent.element.appendChild( this.element );
};

PrevNextButton.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.element );
  // do regular TapListener destroy
  TapListener.prototype.destroy.call( this );
  // click events from keyboard
  this.element.removeEventListener( 'click', this );
};

PrevNextButton.prototype.createSVG = function() {
  var svg = document.createElementNS( svgURI, 'svg');
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  var path = document.createElementNS( svgURI, 'path');
  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
  }
  svg.appendChild( path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) {
    return shape;
  }
  // create movement string
  return 'M ' + shape.x0 + ',50' +
    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
    ' L ' + shape.x3 + ',50 ' +
    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
    ' Z';
}

PrevNextButton.prototype.onTap = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.parent.uiChange();
  var method = this.isPrevious ? 'previous' : 'next';
  this.parent[ method ]();
};

PrevNextButton.prototype.handleEvent = utils.handleEvent;

PrevNextButton.prototype.onclick = function( event ) {
  // only allow clicks from keyboard
  var focused = document.activeElement;
  if ( focused && focused == this.element ) {
    this.onTap( event, event );
  }
};

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  if ( this.isEnabled ) {
    return;
  }
  this.element.disabled = false;
  this.isEnabled = true;
};

PrevNextButton.prototype.disable = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.element.disabled = true;
  this.isEnabled = false;
};

PrevNextButton.prototype.update = function() {
  // index of first or last slide, if previous or next
  var slides = this.parent.slides;
  // enable is wrapAround and at least 2 slides
  if ( this.parent.options.wrapAround && slides.length > 1 ) {
    this.enable();
    return;
  }
  var lastIndex = slides.length ? slides.length - 1 : 0;
  var boundIndex = this.isPrevious ? 0 : lastIndex;
  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
  this[ method ]();
};

PrevNextButton.prototype.destroy = function() {
  this.deactivate();
};

// -------------------------- Flickity prototype -------------------------- //

utils.extend( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  }
});

Flickity.createMethods.push('_createPrevNextButtons');
var proto = Flickity.prototype;

proto._createPrevNextButtons = function() {
  if ( !this.options.prevNextButtons ) {
    return;
  }

  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );

  this.on( 'activate', this.activatePrevNextButtons );
};

proto.activatePrevNextButtons = function() {
  this.prevButton.activate();
  this.nextButton.activate();
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.deactivate();
  this.nextButton.deactivate();
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

}));

// page dots
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/page-dots',[
      './flickity',
      'tap-listener/tap-listener',
      'fizzy-ui-utils/utils'
    ], function( Flickity, TapListener, utils ) {
      return factory( window, Flickity, TapListener, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('tap-listener'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.TapListener,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, TapListener, utils ) {

// -------------------------- PageDots -------------------------- //



function PageDots( parent ) {
  this.parent = parent;
  this._create();
}

PageDots.prototype = new TapListener();

PageDots.prototype._create = function() {
  // create holder element
  this.holder = document.createElement('ol');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
  // events
  this.on( 'tap', this.onTap );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PageDots.prototype.activate = function() {
  this.setDots();
  this.bindTap( this.holder );
  // add to DOM
  this.parent.element.appendChild( this.holder );
};

PageDots.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.holder );
  TapListener.prototype.destroy.call( this );
};

PageDots.prototype.setDots = function() {
  // get difference between number of slides and number of dots
  var delta = this.parent.slides.length - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  var fragment = document.createDocumentFragment();
  var newDots = [];
  var length = this.dots.length;
  var max = length + count;

  for ( var i = length; i < max; i++ ) {
    var dot = document.createElement('li');
    dot.className = 'dot';
    dot.setAttribute( 'aria-label', 'Page dot ' + ( i + 1 ) );
    fragment.appendChild( dot );
    newDots.push( dot );
  }

  this.holder.appendChild( fragment );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  var removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( function( dot ) {
    this.holder.removeChild( dot );
  }, this );
};

PageDots.prototype.updateSelected = function() {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.className = 'dot';
    this.selectedDot.removeAttribute('aria-current');
  }
  // don't proceed if no dots
  if ( !this.dots.length ) {
    return;
  }
  this.selectedDot = this.dots[ this.parent.selectedIndex ];
  this.selectedDot.className = 'dot is-selected';
  this.selectedDot.setAttribute( 'aria-current', 'step' );
};

PageDots.prototype.onTap = function( event ) {
  var target = event.target;
  // only care about dot clicks
  if ( target.nodeName != 'LI' ) {
    return;
  }

  this.parent.uiChange();
  var index = this.dots.indexOf( target );
  this.parent.select( index );
};

PageDots.prototype.destroy = function() {
  this.deactivate();
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pageDots: true
});

Flickity.createMethods.push('_createPageDots');

var proto = Flickity.prototype;

proto._createPageDots = function() {
  if ( !this.options.pageDots ) {
    return;
  }
  this.pageDots = new PageDots( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

proto.activatePageDots = function() {
  this.pageDots.activate();
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected();
};

proto.updatePageDots = function() {
  this.pageDots.setDots();
};

proto.deactivatePageDots = function() {
  this.pageDots.deactivate();
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

}));

// player & autoPlay
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/player',[
      'ev-emitter/ev-emitter',
      'fizzy-ui-utils/utils',
      './flickity'
    ], function( EvEmitter, utils, Flickity ) {
      return factory( EvEmitter, utils, Flickity );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('ev-emitter'),
      require('fizzy-ui-utils'),
      require('./flickity')
    );
  } else {
    // browser global
    factory(
      window.EvEmitter,
      window.fizzyUIUtils,
      window.Flickity
    );
  }

}( window, function factory( EvEmitter, utils, Flickity ) {



// -------------------------- Player -------------------------- //

function Player( parent ) {
  this.parent = parent;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
}

Player.prototype = Object.create( EvEmitter.prototype );

// start play
Player.prototype.play = function() {
  if ( this.state == 'playing' ) {
    return;
  }
  // do not play if page is hidden, start playing when page is visible
  var isPageHidden = document.hidden;
  if ( isPageHidden ) {
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state != 'playing' ) {
    return;
  }

  var time = this.parent.options.autoPlay;
  // default to 3 seconds
  time = typeof time == 'number' ? time : 3000;
  var _this = this;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( function() {
    _this.parent.next( true );
    _this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state == 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state == 'paused' ) {
    this.play();
  }
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  var isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pauseAutoPlayOnHover: true
});

Flickity.createMethods.push('_createPlayer');
var proto = Flickity.prototype;

proto._createPlayer = function() {
  this.player = new Player( this );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) {
    return;
  }
  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) {
    return;
  }
  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

}));

// add, remove cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/add-remove-cell',[
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {



// append cells to a document fragment
function getCellsFragment( cells ) {
  var fragment = document.createDocumentFragment();
  cells.forEach( function( cell ) {
    fragment.appendChild( cell.element );
  });
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

var proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {Element, Array, NodeList} elems
 * @param {Integer} index
 */
proto.insert = function( elems, index ) {
  var cells = this._makeCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }
  var len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  var fragment = getCellsFragment( cells );
  // append to slider
  var isAppend = index == len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    var insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    var endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );
  this.cellChange( index, true );
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {Element, Array, NodeList} elems
 */
proto.remove = function( elems ) {
  var cells = this.getCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }

  var minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( function( cell ) {
    cell.remove();
    var index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
  }, this );

  this.cellChange( minCellIndex, true );
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  var cell = this.getCell( elem );
  if ( !cell ) {
    return;
  }
  cell.getSize();

  var index = this.cells.indexOf( cell );
  this.cellChange( index );
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
  var prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._getWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex
  // try to maintain position & select previous selected element
  var cell = this.getCell( prevSelectedElem );
  if ( cell ) {
    this.selectedIndex = this.getCellSlideIndex( cell );
  }
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
  // do not position slider after lazy load
  if ( isPositioningSlider ) {
    this.positionSliderAtSelected();
  }
};

// -----  ----- //

return Flickity;

}));

// lazyload
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/lazyload',[
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {
'use strict';

Flickity.createMethods.push('_createLazyload');
var proto = Flickity.prototype;

proto._createLazyload = function() {
  this.on( 'select', this.lazyLoad );
};

proto.lazyLoad = function() {
  var lazyLoad = this.options.lazyLoad;
  if ( !lazyLoad ) {
    return;
  }
  // get adjacent cells, use lazyLoad option for adjacent count
  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  var cellElems = this.getAdjacentCellElements( adjCount );
  // get lazy images in those cells
  var lazyImages = [];
  cellElems.forEach( function( cellElem ) {
    var lazyCellImages = getCellLazyImages( cellElem );
    lazyImages = lazyImages.concat( lazyCellImages );
  });
  // load lazy images
  lazyImages.forEach( function( img ) {
    new LazyLoader( img, this );
  }, this );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.nodeName == 'IMG' ) {
    var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
    var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
    var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
    if ( lazyloadAttr || srcAttr || srcsetAttr ) {
      return [ cellElem ];
    }
  }
  // select lazy images in cell
  var lazySelector = 'img[data-flickity-lazyload], ' +
    'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
  var imgs = cellElem.querySelectorAll( lazySelector );
  return utils.makeArray( imgs );
}

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 */
function LazyLoader( img, flickity ) {
  this.img = img;
  this.flickity = flickity;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  var src = this.img.getAttribute('data-flickity-lazyload') ||
    this.img.getAttribute('data-flickity-lazyload-src');
  var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
  // set src & serset
  this.img.src = src;
  if ( srcset ) {
    this.img.setAttribute( 'srcset', srcset );
  }
  // remove attr
  this.img.removeAttribute('data-flickity-lazyload');
  this.img.removeAttribute('data-flickity-lazyload-src');
  this.img.removeAttribute('data-flickity-lazyload-srcset');
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );

  var cell = this.flickity.getParentCell( this.img );
  var cellElem = cell && cell.element;
  this.flickity.cellSizeChange( cellElem );

  this.img.classList.add( className );
  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

}));

/*!
 * Flickity v2.1.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/index',[
      './flickity',
      './drag',
      './prev-next-button',
      './page-dots',
      './player',
      './add-remove-cell',
      './lazyload'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('./flickity'),
      require('./drag'),
      require('./prev-next-button'),
      require('./page-dots'),
      require('./player'),
      require('./add-remove-cell'),
      require('./lazyload')
    );
  }

})( window, function factory( Flickity ) {
  /*jshint strict: false*/
  return Flickity;
});

/*!
 * Flickity asNavFor v2.0.1
 * enable asNavFor for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity-as-nav-for/as-nav-for',[
      'flickity/js/index',
      'fizzy-ui-utils/utils'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( Flickity, utils ) {



// -------------------------- asNavFor prototype -------------------------- //

// Flickity.defaults.asNavFor = null;

Flickity.createMethods.push('_createAsNavFor');

var proto = Flickity.prototype;

proto._createAsNavFor = function() {
  this.on( 'activate', this.activateAsNavFor );
  this.on( 'deactivate', this.deactivateAsNavFor );
  this.on( 'destroy', this.destroyAsNavFor );

  var asNavForOption = this.options.asNavFor;
  if ( !asNavForOption ) {
    return;
  }
  // HACK do async, give time for other flickity to be initalized
  var _this = this;
  setTimeout( function initNavCompanion() {
    _this.setNavCompanion( asNavForOption );
  });
};

proto.setNavCompanion = function( elem ) {
  elem = utils.getQueryElement( elem );
  var companion = Flickity.data( elem );
  // stop if no companion or companion is self
  if ( !companion || companion == this ) {
    return;
  }

  this.navCompanion = companion;
  // companion select
  var _this = this;
  this.onNavCompanionSelect = function() {
    _this.navCompanionSelect();
  };
  companion.on( 'select', this.onNavCompanionSelect );
  // click
  this.on( 'staticClick', this.onNavStaticClick );

  this.navCompanionSelect( true );
};

proto.navCompanionSelect = function( isInstant ) {
  if ( !this.navCompanion ) {
    return;
  }
  // select slide that matches first cell of slide
  var selectedCell = this.navCompanion.selectedCells[0];
  var firstIndex = this.navCompanion.cells.indexOf( selectedCell );
  var lastIndex = firstIndex + this.navCompanion.selectedCells.length - 1;
  var selectIndex = Math.floor( lerp( firstIndex, lastIndex,
    this.navCompanion.cellAlign ) );
  this.selectCell( selectIndex, false, isInstant );
  // set nav selected class
  this.removeNavSelectedElements();
  // stop if companion has more cells than this one
  if ( selectIndex >= this.cells.length ) {
    return;
  }

  var selectedCells = this.cells.slice( firstIndex, lastIndex + 1 );
  this.navSelectedElements = selectedCells.map( function( cell ) {
    return cell.element;
  });
  this.changeNavSelectedClass('add');
};

function lerp( a, b, t ) {
  return ( b - a ) * t + a;
}

proto.changeNavSelectedClass = function( method ) {
  this.navSelectedElements.forEach( function( navElem ) {
    navElem.classList[ method ]('is-nav-selected');
  });
};

proto.activateAsNavFor = function() {
  this.navCompanionSelect( true );
};

proto.removeNavSelectedElements = function() {
  if ( !this.navSelectedElements ) {
    return;
  }
  this.changeNavSelectedClass('remove');
  delete this.navSelectedElements;
};

proto.onNavStaticClick = function( event, pointer, cellElement, cellIndex ) {
  if ( typeof cellIndex == 'number' ) {
    this.navCompanion.selectCell( cellIndex );
  }
};

proto.deactivateAsNavFor = function() {
  this.removeNavSelectedElements();
};

proto.destroyAsNavFor = function() {
  if ( !this.navCompanion ) {
    return;
  }
  this.navCompanion.off( 'select', this.onNavCompanionSelect );
  this.off( 'staticClick', this.onNavStaticClick );
  delete this.navCompanion;
};

// -----  ----- //

return Flickity;

}));

/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'imagesloaded/imagesloaded',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {



var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});

/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
      'imagesloaded/imagesloaded'
    ], function( Flickity, imagesLoaded ) {
      return factory( window, Flickity, imagesLoaded );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('flickity'),
      require('imagesloaded')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.imagesLoaded
    );
  }

}( window, function factory( window, Flickity, imagesLoaded ) {
'use strict';

Flickity.createMethods.push('_createImagesLoaded');

var proto = Flickity.prototype;

proto._createImagesLoaded = function() {
  this.on( 'activate', this.imagesLoaded );
};

proto.imagesLoaded = function() {
  if ( !this.options.imagesLoaded ) {
    return;
  }
  var _this = this;
  function onImagesLoadedProgress( instance, image ) {
    var cell = _this.getParentCell( image.img );
    _this.cellSizeChange( cell && cell.element );
    if ( !_this.options.freeScroll ) {
      _this.positionSliderAtSelected();
    }
  }
  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
};

return Flickity;

}));







$('.cta-scroll').click(function(){
  event.preventDefault();
  var offset = $(this).offset().top;
  window.scrollBy({ 
    top: offset + 100, // could be negative value
    left: 0, 
    behavior: 'smooth' 
  });
})
// $('.field-element input, .field-element textarea').keyup(function(){
// 	var element = $(this);
// 	var input = element.val();
// 	if (input.length > 1) {
// 		element.addClass('complete');
// 		element.removeClass('error');
// 	} else if ( input.length == 0 ) {
// 		element.removeClass('complete')
// 		element.addClass('error');
// 	} else {
// 		element.addClass('complete');
// 		element.removeClass('error');
// 	}
// })





// $('.field-element').children(function(){
// 	var element = $(this);
// 	var input = element.val();
// 	if (input.length > 1) {
		
// 	} else {
// 		element.addClass('complete');
// 		element.removeClass('error');
// 	}
// })



$(document).ready(function(){
	
	if ($('.humanise-slider__list--one-item').length) {
		
		var sliderItem = document.querySelectorAll('.humanise-slider__list--one-item');
		for (var i=0, numberOfItems = sliderItem.length; i < numberOfItems; i++) {
			var currentSliderItem = sliderItem[i];
			new Flickity(currentSliderItem, {
				resize: true,
				contain: false,
				groupCells: 1,
				prevNextButtons: true,
				pageDots: false,
				wrapAround: true,
				draggable: true,
				autoPlay: false,
				on: {
					ready: function() {
						$(".humanise-slider__list--one-item .flickity-button").wrapAll("<div class='flickity-buttons'></div>");
						var imageHeight = $(".humanise-slider__list--one-item .humanise-slide__img").height();
						$(".humanise-slider__list--one-item .flickity-buttons").height(imageHeight);
											
						$(window).resize(function() {
						  imageHeight = $(".humanise-slider__list--one-item .humanise-slide__img").height();
						  $(".humanise-slider__list--one-item .flickity-buttons").height(imageHeight);
						});
											
					},
					change: function() {
						$(".humanise-slider__list--one-item .flickity-button").removeClass('show').addClass('hide');
					},
					settle: function() {
						$(".humanise-slider__list--one-item .flickity-button").removeClass('hide').addClass('show');
					}
				}
			});
		}
	
	}
	
});




if ( $('[data-ytID]').length ) {
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var players = [];
	var videoIds = [];

	function onYouTubeIframeAPIReady() {
	$('[data-ytID]').each(function(index) {
		videoIds[index] = $(this).attr('id');
		var ytID = $('#' + videoIds[index] + '[data-ytID]').attr('data-ytID');
			players[index] = new YT.Player(videoIds[index], {
				height: '100%',
				width: '100%',
				videoId: ytID,
				playerVars: { 
					'showinfo':0,
					'controls':0, 
					'rel':0,
					'fs':0,
					'modestbranding':1,
				},
				events: {
					'onReady': function(event) {
						// console.log(event);
						var autoplay = $('#' + videoIds[index]).attr('data-video-autoplay');
						if (autoplay == 1) {
							event.target.mute();
							event.target.playVideo();
						}
					},
					onStateChange: function(event) {
						loopVideo(event, videoIds[index], players[index]);
					}
				}
			});
		});
	}
	function loopVideo(event, videoIdsIndex, playersIndex){
		var loop = $('#' + videoIdsIndex).attr('data-video-loop')
		if (event.data === YT.PlayerState.ENDED && loop == 1 ) {
			playersIndex.playVideo(); 
		}
	}
}

$(document).ready(function(){
	if ($(".humanise-tabs__tab-select--tab").length != 0){
		
		var startLeft = $(".humanise-tabs__tab-select--tab").first().position().left;
		$('.humanise-tabs__tab-select--nav').css('left',startLeft+'px');

		$(".humanise-tabs__tab-select--tab").click(function(){
			$("li[role='tab']").attr("aria-selected","false"); //deselect all the tabs 
			$(this).attr("aria-selected","true");  // select this tab
			var posLeft = $(this).position().left;  // select this tab
			$('.humanise-tabs__tab-select--nav').css('left',posLeft+'px');
			var tabpanid= $(this).attr("aria-controls"); //find out what tab panel this tab controls  
			var tabpan = $("#"+tabpanid);  
			$("div[role='tabpanel']").attr("aria-hidden","true"); //hide all the panels 
			tabpan.attr("aria-hidden","false");  // show our panel
		});

		$("li[role='tab']").keydown(function(ev) {
			if (ev.which ==13) {
				$(this).click()
			}
		});

		//This adds keyboard function that pressing an arrow left or arrow right from the tabs toggle the tabs. 
		$("li[role='tab']").keydown(function(ev) { 
			if ((ev.which ==39)||(ev.which ==37)) { 
				var selected= $(this).attr("aria-selected"); 
				if (selected =="true"){ 
					$("li[aria-selected='false']").attr("aria-selected","true").focus(); 
					$(this).attr("aria-selected","false"); 
					var tabpanid= $("li[aria-selected='true']").attr("aria-controls"); 
					var tabpan = $("#"+tabpanid); 
					$("div[role='tabpanel']").attr("aria-hidden","true"); 
					tabpan.attr("aria-hidden","false");
				}
			}
		});
	}
});
if ( $('.humanise-deeplink-nav__item').length ){
	
	// Deep link buttons set up
	$('.humanise-deeplink-nav__item a').click(function() {
		event.preventDefault();
		var scrollID = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(scrollID).offset().top -100
		}, 500);
		
	});

	// Cache selectors outside callback for performance. 
	var item 	= $('.humanise-deeplink-nav');
	var itemTop = item.offset().top -10;

	$(window).scroll(function() {
		item.toggleClass('sticky', $(window).scrollTop() > itemTop);
	});

}

if ( $('.fancybox-thumb').length ) {
	;(function (window, document, $, undefined) {
		"use strict";

		var H = $("html"),
			W = $(window),
			D = $(document),
			F = $.fancybox = function () {
				F.open.apply( this, arguments );
			},
			IE =  navigator.userAgent.match(/msie/i),
			didUpdate	= null,
			isTouch		= document.createTouch !== undefined,

			isQuery	= function(obj) {
				return obj && obj.hasOwnProperty && obj instanceof $;
			},
			isString = function(str) {
				return str && $.type(str) === "string";
			},
			isPercentage = function(str) {
				return isString(str) && str.indexOf('%') > 0;
			},
			isScrollable = function(el) {
				return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
			},
			getScalar = function(orig, dim) {
				var value = parseInt(orig, 10) || 0;

				if (dim && isPercentage(orig)) {
					value = F.getViewport()[ dim ] / 100 * value;
				}

				return Math.ceil(value);
			},
			getValue = function(value, dim) {
				return getScalar(value, dim) + 'px';
			};

		$.extend(F, {
			// The current version of fancybox
			version: '2.1.7',

			defaults: {
				padding : 0,
				margin  : 0,

				width     : 1920,
				height    : 1300,
				minWidth  : 100,
				minHeight : 100,
				maxWidth  : 9999,
				maxHeight : 9999,
				pixelRatio: 1, // Set to 2 for retina display support

				autoSize   : false,
				autoHeight : false,
				autoWidth  : false,

				autoResize  : false,
				autoCenter  : !isTouch,
				fitToView   : true,
				aspectRatio : false,
				topRatio    : 0.5,
				leftRatio   : 0.5,

				scrolling : 'auto', // 'auto', 'yes' or 'no'
				wrapCSS   : '',

				arrows     : true,
				closeBtn   : true,
				closeClick : true,
				nextClick  : false,
				mouseWheel : true,
				autoPlay   : false,
				playSpeed  : 3000,
				preload    : 3,
				modal      : false,
				loop       : true,

				ajax  : {
					dataType : 'html',
					headers  : { 'X-fancybox': true }
				},
				iframe : {
					scrolling : 'auto',
					preload   : true
				},
				swf : {
					wmode: 'transparent',
					allowfullscreen   : 'true',
					allowscriptaccess : 'always'
				},

				keys  : {
					next : {
						13 : 'left', // enter
						34 : 'up',   // page down
						39 : 'left', // right arrow
						40 : 'up'    // down arrow
					},
					prev : {
						8  : 'right',  // backspace
						33 : 'down',   // page up
						37 : 'right',  // left arrow
						38 : 'down'    // up arrow
					},
					close  : [27], // escape key
					play   : [32], // space - start/stop slideshow
					toggle : [70]  // letter "f" - toggle fullscreen
				},

				direction : {
					next : 'left',
					prev : 'right'
				},

				scrollOutside  : true,

				// Override some properties
				index   : 0,
				type    : null,
				href    : null,
				content : null,
				title   : null,

				// HTML templates
				tpl: {
					wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
					image    : '<img class="fancybox-image" src="{href}" alt="" />',
					iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
					error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
					closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
					next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
					prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
					loading  : '<div id="fancybox-loading"><div></div></div>'
				},

				// Properties for each animation type
				// Opening fancybox
				openEffect  : 'fade', // 'elastic', 'fade' or 'none'
				openSpeed   : 250,
				openEasing  : 'swing',
				openOpacity : true,
				openMethod  : 'zoomIn',

				// Closing fancybox
				closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
				closeSpeed   : 250,
				closeEasing  : 'swing',
				closeOpacity : true,
				closeMethod  : 'zoomOut',

				// Changing next gallery item
				nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
				nextSpeed  : 250,
				nextEasing : 'swing',
				nextMethod : 'changeIn',

				// Changing previous gallery item
				prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
				prevSpeed  : 250,
				prevEasing : 'swing',
				prevMethod : 'changeOut',

				// Enable default helpers
				helpers : {
					overlay : true,
					title   : true
				},

				// Callbacks
				onCancel     : $.noop, // If canceling
				beforeLoad   : $.noop, // Before loading
				afterLoad    : $.noop, // After loading
				beforeShow   : $.noop, // Before changing in current item
				afterShow    : $.noop, // After opening
				beforeChange : $.noop, // Before changing gallery item
				beforeClose  : $.noop, // Before closing
				afterClose   : $.noop  // After closing
			},

			//Current state
			group    : {}, // Selected group
			opts     : {}, // Group options
			previous : null,  // Previous element
			coming   : null,  // Element being loaded
			current  : null,  // Currently loaded element
			isActive : false, // Is activated
			isOpen   : false, // Is currently open
			isOpened : false, // Have been fully opened at least once

			wrap  : null,
			skin  : null,
			outer : null,
			inner : null,

			player : {
				timer    : null,
				isActive : false
			},

			// Loaders
			ajaxLoad   : null,
			imgPreload : null,

			// Some collections
			transitions : {},
			helpers     : {},

			/*
			 *	Static methods
			 */

			open: function (group, opts) {
				if (!group) {
					return;
				}

				if (!$.isPlainObject(opts)) {
					opts = {};
				}

				// Close if already active
				if (false === F.close(true)) {
					return;
				}

				// Normalize group
				if (!$.isArray(group)) {
					group = isQuery(group) ? $(group).get() : [group];
				}

				// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
				$.each(group, function(i, element) {
					var obj = {},
						href,
						title,
						content,
						type,
						rez,
						hrefParts,
						selector;

					if ($.type(element) === "object") {
						// Check if is DOM element
						if (element.nodeType) {
							element = $(element);
						}

						if (isQuery(element)) {
							obj = {
								href    : element.data('fancybox-href') || element.attr('href'),
								title   : $('<div/>').text( element.data('fancybox-title') || element.attr('title') || '' ).html(),
								isDom   : true,
								element : element
							};

							if ($.metadata) {
								$.extend(true, obj, element.metadata());
							}

						} else {
							obj = element;
						}
					}

					href  = opts.href  || obj.href || (isString(element) ? element : null);
					title = opts.title !== undefined ? opts.title : obj.title || '';

					content = opts.content || obj.content;
					type    = content ? 'html' : (opts.type  || obj.type);

					if (!type && obj.isDom) {
						type = element.data('fancybox-type');

						if (!type) {
							rez  = element.prop('class').match(/fancybox\.(\w+)/);
							type = rez ? rez[1] : null;
						}
					}

					if (isString(href)) {
						// Try to guess the content type
						if (!type) {
							if (F.isImage(href)) {
								type = 'image';

							} else if (F.isSWF(href)) {
								type = 'swf';

							} else if (href.charAt(0) === '#') {
								type = 'inline';

							} else if (isString(element)) {
								type    = 'html';
								content = element;
							}
						}

						// Split url into two pieces with source url and content selector, e.g,
						// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
						if (type === 'ajax') {
							hrefParts = href.split(/\s+/, 2);
							href      = hrefParts.shift();
							selector  = hrefParts.shift();
						}
					}

					if (!content) {
						if (type === 'inline') {
							if (href) {
								content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

							} else if (obj.isDom) {
								content = element;
							}

						} else if (type === 'html') {
							content = href;

						} else if (!type && !href && obj.isDom) {
							type    = 'inline';
							content = element;
						}
					}

					$.extend(obj, {
						href     : href,
						type     : type,
						content  : content,
						title    : title,
						selector : selector
					});

					group[ i ] = obj;
				});

				// Extend the defaults
				F.opts = $.extend(true, {}, F.defaults, opts);

				// All options are merged recursive except keys
				if (opts.keys !== undefined) {
					F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
				}

				F.group = group;

				return F._start(F.opts.index);
			},

			// Cancel image loading or abort ajax request
			cancel: function () {
				var coming = F.coming;

				if (coming && false === F.trigger('onCancel')) {
					return;
				}

				F.hideLoading();

				if (!coming) {
					return;
				}

				if (F.ajaxLoad) {
					F.ajaxLoad.abort();
				}

				F.ajaxLoad = null;

				if (F.imgPreload) {
					F.imgPreload.onload = F.imgPreload.onerror = null;
				}

				if (coming.wrap) {
					coming.wrap.stop(true, true).trigger('onReset').remove();
				}

				F.coming = null;

				// If the first item has been canceled, then clear everything
				if (!F.current) {
					F._afterZoomOut( coming );
				}
			},

			// Start closing animation if is open; remove immediately if opening/closing
			close: function (event) {
				F.cancel();

				if (false === F.trigger('beforeClose')) {
					return;
				}

				F.unbindEvents();

				if (!F.isActive) {
					return;
				}

				if (!F.isOpen || event === true) {
					$('.fancybox-wrap').stop(true).trigger('onReset').remove();

					F._afterZoomOut();

				} else {
					F.isOpen = F.isOpened = false;
					F.isClosing = true;

					$('.fancybox-item, .fancybox-nav').remove();

					F.wrap.stop(true, true).removeClass('fancybox-opened');

					F.transitions[ F.current.closeMethod ]();
				}
			},

			// Manage slideshow:
			//   $.fancybox.play(); - toggle slideshow
			//   $.fancybox.play( true ); - start
			//   $.fancybox.play( false ); - stop
			play: function ( action ) {
				var clear = function () {
						clearTimeout(F.player.timer);
					},
					set = function () {
						clear();

						if (F.current && F.player.isActive) {
							F.player.timer = setTimeout(F.next, F.current.playSpeed);
						}
					},
					stop = function () {
						clear();

						D.unbind('.player');

						F.player.isActive = false;

						F.trigger('onPlayEnd');
					},
					start = function () {
						if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
							F.player.isActive = true;

							D.bind({
								'onCancel.player beforeClose.player' : stop,
								'onUpdate.player'   : set,
								'beforeLoad.player' : clear
							});

							set();

							F.trigger('onPlayStart');
						}
					};

				if (action === true || (!F.player.isActive && action !== false)) {
					start();
				} else {
					stop();
				}
			},

			// Navigate to next gallery item
			next: function ( direction ) {
				var current = F.current;

				if (current) {
					if (!isString(direction)) {
						direction = current.direction.next;
					}

					F.jumpto(current.index + 1, direction, 'next');
				}
			},

			// Navigate to previous gallery item
			prev: function ( direction ) {
				var current = F.current;

				if (current) {
					if (!isString(direction)) {
						direction = current.direction.prev;
					}

					F.jumpto(current.index - 1, direction, 'prev');
				}
			},

			// Navigate to gallery item by index
			jumpto: function ( index, direction, router ) {
				var current = F.current;

				if (!current) {
					return;
				}

				index = getScalar(index);

				F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
				F.router    = router || 'jumpto';

				if (current.loop) {
					if (index < 0) {
						index = current.group.length + (index % current.group.length);
					}

					index = index % current.group.length;
				}

				if (current.group[ index ] !== undefined) {
					F.cancel();

					F._start(index);
				}
			},

			// Center inside viewport and toggle position type to fixed or absolute if needed
			reposition: function (e, onlyAbsolute) {
				var current = F.current,
					wrap    = current ? current.wrap : null,
					pos;

				if (wrap) {
					pos = F._getPosition(onlyAbsolute);

					if (e && e.type === 'scroll') {
						delete pos.position;

						wrap.stop(true, true).animate(pos, 200);

					} else {
						wrap.css(pos);

						current.pos = $.extend({}, current.dim, pos);
					}
				}
			},

			update: function (e) {
				var type = (e && e.originalEvent && e.originalEvent.type),
					anyway = !type || type === 'orientationchange';

				if (anyway) {
					clearTimeout(didUpdate);

					didUpdate = null;
				}

				if (!F.isOpen || didUpdate) {
					return;
				}

				didUpdate = setTimeout(function() {
					var current = F.current;

					if (!current || F.isClosing) {
						return;
					}

					F.wrap.removeClass('fancybox-tmp');

					if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
						F._setDimension();
					}

					if (!(type === 'scroll' && current.canShrink)) {
						F.reposition(e);
					}

					F.trigger('onUpdate');

					didUpdate = null;

				}, (anyway && !isTouch ? 0 : 300));
			},

			// Shrink content to fit inside viewport or restore if resized
			toggle: function ( action ) {
				if (F.isOpen) {
					F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

					// Help browser to restore document dimensions
					if (isTouch) {
						F.wrap.removeAttr('style').addClass('fancybox-tmp');

						F.trigger('onUpdate');
					}

					F.update();
				}
			},

			hideLoading: function () {
				D.unbind('.loading');

				$('#fancybox-loading').remove();
			},

			showLoading: function () {
				var el, viewport;

				F.hideLoading();

				el = $(F.opts.tpl.loading).click(F.cancel).appendTo('body');

				// If user will press the escape-button, the request will be canceled
				D.bind('keydown.loading', function(e) {
					if ((e.which || e.keyCode) === 27) {
						e.preventDefault();

						F.cancel();
					}
				});

				if (!F.defaults.fixed) {
					viewport = F.getViewport();

					el.css({
						position : 'absolute',
						top  : (viewport.h * 0.5) + viewport.y,
						left : (viewport.w * 0.5) + viewport.x
					});
				}

				F.trigger('onLoading');
			},

			getViewport: function () {
				var locked = (F.current && F.current.locked) || false,
					rez    = {
						x: W.scrollLeft(),
						y: W.scrollTop()
					};

				if (locked && locked.length) {
					rez.w = locked[0].clientWidth;
					rez.h = locked[0].clientHeight;

				} else {
					// See http://bugs.jquery.com/ticket/6724
					rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
					rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
				}

				return rez;
			},

			// Unbind the keyboard / clicking actions
			unbindEvents: function () {
				if (F.wrap && isQuery(F.wrap)) {
					F.wrap.unbind('.fb');
				}

				D.unbind('.fb');
				W.unbind('.fb');
			},

			bindEvents: function () {
				var current = F.current,
					keys;

				if (!current) {
					return;
				}

				// Changing document height on iOS devices triggers a 'resize' event,
				// that can change document height... repeating infinitely
				W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

				keys = current.keys;

				if (keys) {
					D.bind('keydown.fb', function (e) {
						var code   = e.which || e.keyCode,
							target = e.target || e.srcElement;

						// Skip esc key if loading, because showLoading will cancel preloading
						if (code === 27 && F.coming) {
							return false;
						}

						// Ignore key combinations and key events within form elements
						if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
							$.each(keys, function(i, val) {
								if (current.group.length > 1 && val[ code ] !== undefined) {
									F[ i ]( val[ code ] );

									e.preventDefault();
									return false;
								}

								if ($.inArray(code, val) > -1) {
									F[ i ] ();

									e.preventDefault();
									return false;
								}
							});
						}
					});
				}

				if ($.fn.mousewheel && current.mouseWheel) {
					F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
						var target = e.target || null,
							parent = $(target),
							canScroll = false;

						while (parent.length) {
							if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
								break;
							}

							canScroll = isScrollable( parent[0] );
							parent    = $(parent).parent();
						}

						if (delta !== 0 && !canScroll) {
							if (F.group.length > 1 && !current.canShrink) {
								if (deltaY > 0 || deltaX > 0) {
									F.prev( deltaY > 0 ? 'down' : 'left' );

								} else if (deltaY < 0 || deltaX < 0) {
									F.next( deltaY < 0 ? 'up' : 'right' );
								}

								e.preventDefault();
							}
						}
					});
				}
			},

			trigger: function (event, o) {
				var ret, obj = o || F.coming || F.current;

				if (obj) {
					if ($.isFunction( obj[event] )) {
						ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
					}

					if (ret === false) {
						return false;
					}

					if (obj.helpers) {
						$.each(obj.helpers, function (helper, opts) {
							if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
								F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
							}
						});
					}
				}

				D.trigger(event);
			},

			isImage: function (str) {
				return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
			},

			isSWF: function (str) {
				return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
			},

			_start: function (index) {
				var coming = {},
					obj,
					href,
					type,
					margin,
					padding;

				index = getScalar( index );
				obj   = F.group[ index ] || null;

				if (!obj) {
					return false;
				}

				coming = $.extend(true, {}, F.opts, obj);

				// Convert margin and padding properties to array - top, right, bottom, left
				margin  = coming.margin;
				padding = coming.padding;

				if ($.type(margin) === 'number') {
					coming.margin = [margin, margin, margin, margin];
				}

				if ($.type(padding) === 'number') {
					coming.padding = [padding, padding, padding, padding];
				}

				// 'modal' propery is just a shortcut
				if (coming.modal) {
					$.extend(true, coming, {
						closeBtn   : false,
						closeClick : false,
						nextClick  : false,
						arrows     : false,
						mouseWheel : false,
						keys       : null,
						helpers: {
							overlay : {
								closeClick : false
							}
						}
					});
				}

				// 'autoSize' property is a shortcut, too
				if (coming.autoSize) {
					coming.autoWidth = coming.autoHeight = true;
				}

				if (coming.width === 'auto') {
					coming.autoWidth = true;
				}

				if (coming.height === 'auto') {
					coming.autoHeight = true;
				}

				/*
				 * Add reference to the group, so it`s possible to access from callbacks, example:
				 * afterLoad : function() {
				 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
				 * }
				 */

				coming.group  = F.group;
				coming.index  = index;

				// Give a chance for callback or helpers to update coming item (type, title, etc)
				F.coming = coming;

				if (false === F.trigger('beforeLoad')) {
					F.coming = null;

					return;
				}

				type = coming.type;
				href = coming.href;

				if (!type) {
					F.coming = null;

					//If we can not determine content type then drop silently or display next/prev item if looping through gallery
					if (F.current && F.router && F.router !== 'jumpto') {
						F.current.index = index;

						return F[ F.router ]( F.direction );
					}

					return false;
				}

				F.isActive = true;

				if (type === 'image' || type === 'swf') {
					coming.autoHeight = coming.autoWidth = false;
					coming.scrolling  = 'visible';
				}

				if (type === 'image') {
					coming.aspectRatio = true;
				}

				if (type === 'iframe' && isTouch) {
					coming.scrolling = 'scroll';
				}

				// Build the neccessary markup
				coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

				$.extend(coming, {
					skin  : $('.fancybox-skin',  coming.wrap),
					outer : $('.fancybox-outer', coming.wrap),
					inner : $('.fancybox-inner', coming.wrap)
				});

				$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
					coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
				});

				F.trigger('onReady');

				// Check before try to load; 'inline' and 'html' types need content, others - href
				if (type === 'inline' || type === 'html') {
					if (!coming.content || !coming.content.length) {
						return F._error( 'content' );
					}

				} else if (!href) {
					return F._error( 'href' );
				}

				if (type === 'image') {
					F._loadImage();

				} else if (type === 'ajax') {
					F._loadAjax();

				} else if (type === 'iframe') {
					F._loadIframe();

				} else {
					F._afterLoad();
				}
			},

			_error: function ( type ) {
				$.extend(F.coming, {
					type       : 'html',
					autoWidth  : true,
					autoHeight : true,
					minWidth   : 0,
					minHeight  : 0,
					scrolling  : 'no',
					hasError   : type,
					content    : F.coming.tpl.error
				});

				F._afterLoad();
			},

			_loadImage: function () {
				// Reset preload image so it is later possible to check "complete" property
				var img = F.imgPreload = new Image();

				img.onload = function () {
					this.onload = this.onerror = null;

					F.coming.width  = this.width / F.opts.pixelRatio;
					F.coming.height = this.height / F.opts.pixelRatio;

					F._afterLoad();
				};

				img.onerror = function () {
					this.onload = this.onerror = null;

					F._error( 'image' );
				};

				img.src = F.coming.href;

				if (img.complete !== true) {
					F.showLoading();
				}
			},

			_loadAjax: function () {
				var coming = F.coming;

				F.showLoading();

				F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
					url: coming.href,
					error: function (jqXHR, textStatus) {
						if (F.coming && textStatus !== 'abort') {
							F._error( 'ajax', jqXHR );

						} else {
							F.hideLoading();
						}
					},
					success: function (data, textStatus) {
						if (textStatus === 'success') {
							coming.content = data;

							F._afterLoad();
						}
					}
				}));
			},

			_loadIframe: function() {
				var coming = F.coming,
					iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
						.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
						.attr('src', coming.href);

				// This helps IE
				$(coming.wrap).bind('onReset', function () {
					try {
						$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
					} catch (e) {}
				});

				if (coming.iframe.preload) {
					F.showLoading();

					iframe.one('load', function() {
						$(this).data('ready', 1);

						// iOS will lose scrolling if we resize
						if (!isTouch) {
							$(this).bind('load.fb', F.update);
						}

						// Without this trick:
						//   - iframe won't scroll on iOS devices
						//   - IE7 sometimes displays empty iframe
						$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

						F._afterLoad();
					});
				}

				coming.content = iframe.appendTo( coming.inner );

				if (!coming.iframe.preload) {
					F._afterLoad();
				}
			},

			_preloadImages: function() {
				var group   = F.group,
					current = F.current,
					len     = group.length,
					cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
					item,
					i;

				for (i = 1; i <= cnt; i += 1) {
					item = group[ (current.index + i ) % len ];

					if (item.type === 'image' && item.href) {
						new Image().src = item.href;
					}
				}
			},

			_afterLoad: function () {
				var coming   = F.coming,
					previous = F.current,
					placeholder = 'fancybox-placeholder',
					current,
					content,
					type,
					scrolling,
					href,
					embed;

				F.hideLoading();

				if (!coming || F.isActive === false) {
					return;
				}

				if (false === F.trigger('afterLoad', coming, previous)) {
					coming.wrap.stop(true).trigger('onReset').remove();

					F.coming = null;

					return;
				}

				if (previous) {
					F.trigger('beforeChange', previous);

					previous.wrap.stop(true).removeClass('fancybox-opened')
						.find('.fancybox-item, .fancybox-nav')
						.remove();
				}

				F.unbindEvents();

				current   = coming;
				content   = coming.content;
				type      = coming.type;
				scrolling = coming.scrolling;

				$.extend(F, {
					wrap  : current.wrap,
					skin  : current.skin,
					outer : current.outer,
					inner : current.inner,
					current  : current,
					previous : previous
				});

				href = current.href;

				switch (type) {
					case 'inline':
					case 'ajax':
					case 'html':
						if (current.selector) {
							content = $('<div>').html(content).find(current.selector);

						} else if (isQuery(content)) {
							if (!content.data(placeholder)) {
								content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
							}

							content = content.show().detach();

							current.wrap.bind('onReset', function () {
								if ($(this).find(content).length) {
									content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
								}
							});
						}
					break;

					case 'image':
						content = current.tpl.image.replace(/\{href\}/g, href);
					break;

					case 'swf':
						content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
						embed   = '';

						$.each(current.swf, function(name, val) {
							content += '<param name="' + name + '" value="' + val + '"></param>';
							embed   += ' ' + name + '="' + val + '"';
						});

						content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
					break;
				}

				if (!(isQuery(content) && content.parent().is(current.inner))) {
					current.inner.append( content );
				}

				// Give a chance for helpers or callbacks to update elements
				F.trigger('beforeShow');

				// Set scrolling before calculating dimensions
				current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

				// Set initial dimensions and start position
				F._setDimension();

				F.reposition();

				F.isOpen = false;
				F.coming = null;

				F.bindEvents();

				if (!F.isOpened) {
					$('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

				} else if (previous.prevMethod) {
					F.transitions[ previous.prevMethod ]();
				}

				F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

				F._preloadImages();
			},

			_setDimension: function () {
				var viewport   = F.getViewport(),
					steps      = 0,
					canShrink  = false,
					canExpand  = false,
					wrap       = F.wrap,
					skin       = F.skin,
					inner      = F.inner,
					current    = F.current,
					width      = current.width,
					height     = current.height,
					minWidth   = current.minWidth,
					minHeight  = current.minHeight,
					maxWidth   = current.maxWidth,
					maxHeight  = current.maxHeight,
					scrolling  = current.scrolling,
					scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
					margin     = current.margin,
					wMargin    = getScalar(margin[1] + margin[3]),
					hMargin    = getScalar(margin[0] + margin[2]),
					wPadding,
					hPadding,
					wSpace,
					hSpace,
					origWidth,
					origHeight,
					origMaxWidth,
					origMaxHeight,
					ratio,
					width_,
					height_,
					maxWidth_,
					maxHeight_,
					iframe,
					body;

				// Reset dimensions so we could re-check actual size
				wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

				wPadding = getScalar(skin.outerWidth(true)  - skin.width());
				hPadding = getScalar(skin.outerHeight(true) - skin.height());

				// Any space between content and viewport (margin, padding, border, title)
				wSpace = wMargin + wPadding;
				hSpace = hMargin + hPadding;

				origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
				origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

				if (current.type === 'iframe') {
					iframe = current.content;

					if (current.autoHeight && iframe && iframe.data('ready') === 1) {
						try {
							if (iframe[0].contentWindow.document.location) {
								inner.width( origWidth ).height(9999);

								body = iframe.contents().find('body');

								if (scrollOut) {
									body.css('overflow-x', 'hidden');
								}

								origHeight = body.outerHeight(true);
							}

						} catch (e) {}
					}

				} else if (current.autoWidth || current.autoHeight) {
					inner.addClass( 'fancybox-tmp' );

					// Set width or height in case we need to calculate only one dimension
					if (!current.autoWidth) {
						inner.width( origWidth );
					}

					if (!current.autoHeight) {
						inner.height( origHeight );
					}

					if (current.autoWidth) {
						origWidth = inner.width();
					}

					if (current.autoHeight) {
						origHeight = inner.height();
					}

					inner.removeClass( 'fancybox-tmp' );
				}

				width  = getScalar( origWidth );
				height = getScalar( origHeight );

				ratio  = origWidth / origHeight;

				// Calculations for the content
				minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
				maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

				minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
				maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

				// These will be used to determine if wrap can fit in the viewport
				origMaxWidth  = maxWidth;
				origMaxHeight = maxHeight;

				if (current.fitToView) {
					maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
					maxHeight = Math.min(viewport.h - hSpace, maxHeight);
				}

				maxWidth_  = viewport.w - wMargin;
				maxHeight_ = viewport.h - hMargin;

				if (current.aspectRatio) {
					if (width > maxWidth) {
						width  = maxWidth;
						height = getScalar(width / ratio);
					}

					if (height > maxHeight) {
						height = maxHeight;
						width  = getScalar(height * ratio);
					}

					if (width < minWidth) {
						width  = minWidth;
						height = getScalar(width / ratio);
					}

					if (height < minHeight) {
						height = minHeight;
						width  = getScalar(height * ratio);
					}

				} else {
					width = Math.max(minWidth, Math.min(width, maxWidth));

					if (current.autoHeight && current.type !== 'iframe') {
						inner.width( width );

						height = inner.height();
					}

					height = Math.max(minHeight, Math.min(height, maxHeight));
				}

				// Try to fit inside viewport (including the title)
				if (current.fitToView) {
					inner.width( width ).height( height );

					wrap.width( width + wPadding );

					// Real wrap dimensions
					width_  = wrap.width();
					height_ = wrap.height();

					if (current.aspectRatio) {
						while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
							if (steps++ > 19) {
								break;
							}

							height = Math.max(minHeight, Math.min(maxHeight, height - 10));
							width  = getScalar(height * ratio);

							if (width < minWidth) {
								width  = minWidth;
								height = getScalar(width / ratio);
							}

							if (width > maxWidth) {
								width  = maxWidth;
								height = getScalar(width / ratio);
							}

							inner.width( width ).height( height );

							wrap.width( width + wPadding );

							width_  = wrap.width();
							height_ = wrap.height();
						}

					} else {
						width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
						height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
					}
				}

				if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
					width += scrollOut;
				}

				inner.width( width ).height( height );

				wrap.width( width + wPadding );

				width_  = wrap.width();
				height_ = wrap.height();

				canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
				canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

				$.extend(current, {
					dim : {
						width	: getValue( width_ ),
						height	: getValue( height_ )
					},
					origWidth  : origWidth,
					origHeight : origHeight,
					canShrink  : canShrink,
					canExpand  : canExpand,
					wPadding   : wPadding,
					hPadding   : hPadding,
					wrapSpace  : height_ - skin.outerHeight(true),
					skinSpace  : skin.height() - height
				});

				if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
					inner.height('auto');
				}
			},

			_getPosition: function (onlyAbsolute) {
				var current  = F.current,
					viewport = F.getViewport(),
					margin   = current.margin,
					width    = F.wrap.width()  + margin[1] + margin[3],
					height   = F.wrap.height() + margin[0] + margin[2],
					rez      = {
						position: 'absolute',
						top  : margin[0],
						left : margin[3]
					};

				if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
					rez.position = 'fixed';

				} else if (!current.locked) {
					rez.top  += viewport.y;
					rez.left += viewport.x;
				}

				rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
				rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

				return rez;
			},

			_afterZoomIn: function () {
				var current = F.current;

				if (!current) {
					return;
				}

				F.isOpen = F.isOpened = true;

				F.wrap.css('overflow', 'visible').addClass('fancybox-opened').hide().show(0);

				F.update();

				// Assign a click event
				if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
					F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
						if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
							e.preventDefault();

							F[ current.closeClick ? 'close' : 'next' ]();
						}
					});
				}

				// Create a close button
				if (current.closeBtn) {
					$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
						e.preventDefault();

						F.close();
					});
				}

				// Create navigation arrows
				if (current.arrows && F.group.length > 1) {
					if (current.loop || current.index > 0) {
						$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
					}

					if (current.loop || current.index < F.group.length - 1) {
						$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
					}
				}

				F.trigger('afterShow');

				// Stop the slideshow if this is the last item
				if (!current.loop && current.index === current.group.length - 1) {

					F.play( false );

				} else if (F.opts.autoPlay && !F.player.isActive) {
					F.opts.autoPlay = false;

					F.play(true);
				}
			},

			_afterZoomOut: function ( obj ) {
				obj = obj || F.current;

				$('.fancybox-wrap').trigger('onReset').remove();

				$.extend(F, {
					group  : {},
					opts   : {},
					router : false,
					current   : null,
					isActive  : false,
					isOpened  : false,
					isOpen    : false,
					isClosing : false,
					wrap   : null,
					skin   : null,
					outer  : null,
					inner  : null
				});

				F.trigger('afterClose', obj);
			}
		});

		/*
		 *	Default transitions
		 */

		F.transitions = {
			getOrigPosition: function () {
				var current  = F.current,
					element  = current.element,
					orig     = current.orig,
					pos      = {},
					width    = 50,
					height   = 50,
					hPadding = current.hPadding,
					wPadding = current.wPadding,
					viewport = F.getViewport();

				if (!orig && current.isDom && element.is(':visible')) {
					orig = element.find('img:first');

					if (!orig.length) {
						orig = element;
					}
				}

				if (isQuery(orig)) {
					pos = orig.offset();

					if (orig.is('img')) {
						width  = orig.outerWidth();
						height = orig.outerHeight();
					}

				} else {
					pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
					pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
				}

				if (F.wrap.css('position') === 'fixed' || current.locked) {
					pos.top  -= viewport.y;
					pos.left -= viewport.x;
				}

				pos = {
					top     : getValue(pos.top  - hPadding * current.topRatio),
					left    : getValue(pos.left - wPadding * current.leftRatio),
					width   : getValue(width  + wPadding),
					height  : getValue(height + hPadding)
				};

				return pos;
			},

			step: function (now, fx) {
				var ratio,
					padding,
					value,
					prop       = fx.prop,
					current    = F.current,
					wrapSpace  = current.wrapSpace,
					skinSpace  = current.skinSpace;

				if (prop === 'width' || prop === 'height') {
					ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

					if (F.isClosing) {
						ratio = 1 - ratio;
					}

					padding = prop === 'width' ? current.wPadding : current.hPadding;
					value   = now - padding;

					F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
					F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
				}
			},

			zoomIn: function () {
				var current  = F.current,
					startPos = current.pos,
					effect   = current.openEffect,
					elastic  = effect === 'elastic',
					endPos   = $.extend({opacity : 1}, startPos);

				// Remove "position" property that breaks older IE
				delete endPos.position;

				if (elastic) {
					startPos = this.getOrigPosition();

					if (current.openOpacity) {
						startPos.opacity = 0.1;
					}

				} else if (effect === 'fade') {
					startPos.opacity = 0.1;
				}

				F.wrap.css(startPos).animate(endPos, {
					duration : effect === 'none' ? 0 : current.openSpeed,
					easing   : current.openEasing,
					step     : elastic ? this.step : null,
					complete : F._afterZoomIn
				});
			},

			zoomOut: function () {
				var current  = F.current,
					effect   = current.closeEffect,
					elastic  = effect === 'elastic',
					endPos   = {opacity : 0.1};

				if (elastic) {
					endPos = this.getOrigPosition();

					if (current.closeOpacity) {
						endPos.opacity = 0.1;
					}
				}

				F.wrap.animate(endPos, {
					duration : effect === 'none' ? 0 : current.closeSpeed,
					easing   : current.closeEasing,
					step     : elastic ? this.step : null,
					complete : F._afterZoomOut
				});
			},

			changeIn: function () {
				var current   = F.current,
					effect    = current.nextEffect,
					startPos  = current.pos,
					endPos    = { opacity : 1 },
					direction = F.direction,
					distance  = 200,
					field;

				startPos.opacity = 0.1;

				if (effect === 'elastic') {
					field = direction === 'down' || direction === 'up' ? 'top' : 'left';

					if (direction === 'down' || direction === 'right') {
						startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
						endPos[ field ]   = '+=' + distance + 'px';

					} else {
						startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
						endPos[ field ]   = '-=' + distance + 'px';
					}
				}

				// Workaround for http://bugs.jquery.com/ticket/12273
				if (effect === 'none') {
					F._afterZoomIn();

				} else {
					F.wrap.css(startPos).animate(endPos, {
						duration : current.nextSpeed,
						easing   : current.nextEasing,
						complete : F._afterZoomIn
					});
				}
			},

			changeOut: function () {
				var previous  = F.previous,
					effect    = previous.prevEffect,
					endPos    = { opacity : 0.1 },
					direction = F.direction,
					distance  = 200;

				if (effect === 'elastic') {
					endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
				}

				previous.wrap.animate(endPos, {
					duration : effect === 'none' ? 0 : previous.prevSpeed,
					easing   : previous.prevEasing,
					complete : function () {
						$(this).trigger('onReset').remove();
					}
				});
			}
		};

		/*
		 *	Overlay helper
		 */

		F.helpers.overlay = {
			defaults : {
				closeClick : true,      // if true, fancybox will be closed when user clicks on the overlay
				speedOut   : 200,       // duration of fadeOut animation
				showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
				css        : {},        // custom CSS properties
				locked     : !isTouch,  // if true, the content will be locked into overlay
				fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
			},

			overlay : null,      // current handle
			fixed   : false,     // indicates if the overlay has position "fixed"
			el      : $('html'), // element that contains "the lock"

			// Public methods
			create : function(opts) {
				var parent;

				opts = $.extend({}, this.defaults, opts);

				if (this.overlay) {
					this.close();
				}

				parent = F.coming ? F.coming.parent : opts.parent;

				this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( parent && parent.length ? parent : 'body' );
				this.fixed   = false;

				if (opts.fixed && F.defaults.fixed) {
					this.overlay.addClass('fancybox-overlay-fixed');

					this.fixed = true;
				}
			},

			open : function(opts) {
				var that = this;

				opts = $.extend({}, this.defaults, opts);

				if (this.overlay) {
					this.overlay.unbind('.overlay').width('auto').height('auto');

				} else {
					this.create(opts);
				}

				if (!this.fixed) {
					W.bind('resize.overlay', $.proxy( this.update, this) );

					this.update();
				}

				if (opts.closeClick) {
					this.overlay.bind('click.overlay', function(e) {
						if ($(e.target).hasClass('fancybox-overlay')) {
							if (F.isActive) {
								F.close();
							} else {
								that.close();
							}

							return false;
						}
					});
				}

				this.overlay.css( opts.css ).show();
			},

			close : function() {
				W.unbind('resize.overlay');

				if (this.el.hasClass('fancybox-lock')) {
					$('.fancybox-margin').removeClass('fancybox-margin');

					this.el.removeClass('fancybox-lock');

					W.scrollTop( this.scrollV ).scrollLeft( this.scrollH );
				}

				$('.fancybox-overlay').remove().hide();

				$.extend(this, {
					overlay : null,
					fixed   : false
				});
			},

			// Private, callbacks

			update : function () {
				var width = '100%', offsetWidth;

				// Reset width/height so it will not mess
				this.overlay.width(width).height('100%');

				// jQuery does not return reliable result for IE
				if (IE) {
					offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

					if (D.width() > offsetWidth) {
						width = D.width();
					}

				} else if (D.width() > W.width()) {
					width = D.width();
				}

				this.overlay.width(width).height(D.height());
			},

			// This is where we can manipulate DOM, because later it would cause iframes to reload
			onReady : function (opts, obj) {
				var overlay = this.overlay;

				$('.fancybox-overlay').stop(true, true);

				if (!overlay) {
					this.create(opts);
				}

				if (opts.locked && this.fixed && obj.fixed) {
					obj.locked = this.overlay.append( obj.wrap );
					obj.fixed  = false;
				}

				if (opts.showEarly === true) {
					this.beforeShow.apply(this, arguments);
				}
			},

			beforeShow : function(opts, obj) {
				if (obj.locked && !this.el.hasClass('fancybox-lock')) {
					if (this.fixPosition !== false) {
						$('*:not(object)').filter(function(){
							return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
						}).addClass('fancybox-margin');
					}

					this.el.addClass('fancybox-margin');

					this.scrollV = W.scrollTop();
					this.scrollH = W.scrollLeft();

					this.el.addClass('fancybox-lock');

					W.scrollTop( this.scrollV ).scrollLeft( this.scrollH );
				}

				this.open(opts);
			},

			onUpdate : function() {
				if (!this.fixed) {
					this.update();
				}
			},

			afterClose: function (opts) {
				// Remove overlay if exists and fancybox is not opening
				// (e.g., it is not being open using afterClose callback)
				if (this.overlay && !F.coming) {
					this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
				}
			}
		};

		/*
		 *	Title helper
		 */

		F.helpers.title = {
			defaults : {
				type     : 'float', // 'float', 'inside', 'outside' or 'over',
				position : 'bottom' // 'top' or 'bottom'
			},

			beforeShow: function (opts) {
				var current = F.current,
					text    = current.title,
					type    = opts.type,
					title,
					target;

				if ($.isFunction(text)) {
					text = text.call(current.element, current);
				}

				if (!isString(text) || $.trim(text) === '') {
					return;
				}

				title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

				switch (type) {
					case 'inside':
						target = F.skin;
					break;

					case 'outside':
						target = F.wrap;
					break;

					case 'over':
						target = F.inner;
					break;

					default: // 'float'
						target = F.skin;

						title.appendTo('body');

						if (IE) {
							title.width( title.width() );
						}

						title.wrapInner('<span class="child"></span>');

						//Increase bottom margin so this title will also fit into viewport
						F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
					break;
				}

				title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
			}
		};

		// jQuery plugin initialization
		$.fn.fancybox = function (options) {
			var index,
				that     = $(this),
				selector = this.selector || '',
				run      = function(e) {
					var what = $(this).blur(), idx = index, relType, relVal;

					if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
						relType = options.groupAttr || 'data-fancybox-group';
						relVal  = what.attr(relType);

						if (!relVal) {
							relType = 'rel';
							relVal  = what.get(0)[ relType ];
						}

						if (relVal && relVal !== '' && relVal !== 'nofollow') {
							what = selector.length ? $(selector) : that;
							what = what.filter('[' + relType + '="' + relVal + '"]');
							idx  = what.index(this);
						}

						options.index = idx;

						// Stop an event from bubbling if everything is fine
						if (F.open(what, options) !== false) {
							e.preventDefault();
						}
					}
				};

			options = options || {};
			index   = options.index || 0;

			if (!selector || options.live === false) {
				that.unbind('click.fb-start').bind('click.fb-start', run);

			} else {
				D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
			}

			this.filter('[data-fancybox-start=1]').trigger('click');

			return this;
		};

		// Tests that need a body at doc ready
		D.ready(function() {
			var w1, w2;

			if ( $.scrollbarWidth === undefined ) {
				// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
				$.scrollbarWidth = function() {
					var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
						child  = parent.children(),
						width  = child.innerWidth() - child.height( 99 ).innerWidth();

					parent.remove();

					return width;
				};
			}

			if ( $.support.fixedPosition === undefined ) {
				$.support.fixedPosition = (function() {
					var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
						fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

					elem.remove();

					return fixed;
				}());
			}

			$.extend(F.defaults, {
				scrollbarWidth : $.scrollbarWidth(),
				fixed  : $.support.fixedPosition,
				parent : $('body')
			});

			//Get real width of page scroll-bar
			w1 = $(window).width();

			H.addClass('fancybox-lock-test');

			w2 = $(window).width();

			H.removeClass('fancybox-lock-test');

			$("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
		});

	}(window, document, jQuery));

	$(".fancybox-thumb").fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
	});
}

// $(document).ready(function() {
// 	$(".fancybox-thumb").fancybox({
// 		prevEffect	: 'none',
// 		nextEffect	: 'none',
// 		// helpers	: {
// 		// 	title	: {
// 		// 		type: 'outside'
// 		// 	},
// 		// 	thumbs	: {
// 		// 		width	: 50,
// 		// 		height	: 50
// 		// 	}
// 		// }
// 	});
// });

if ( $('.humanise-parallax__item').length ) {
	$(window).scroll(function(){
		// This is then function used to detect if the element is scrolled into view
		function elementScrolled(elem) {
			if ($('.humanise-parallax__item').length) {
				var docViewTop = $(window).scrollTop();
				var docViewTop = docViewTop + 1800;

				var elemTop = $(elem).offset().top;

				return ( (elemTop <= docViewTop) );
			}
		}

		if (elementScrolled('.humanise-parallax') ) {
			var x = $(window).scrollTop() + $('.humanise-parallax__item').outerHeight() - $('.humanise-parallax').offset().top + 200;

			var x = x+200;
			$('.itemA').css('top', -(x*.3)+'px');
			$('.itemB').css('top', (x*0.3)+'px');
		}
	});
}


function initDBSDSpecs($stats){
    
    // Spec selector toggle
    
    var toggleButtons = $stats.find('.humanise-stats__spec-details__toggle-button');
    var itemHeightsArray = [];
    var item;
    var apiUrl = 'https://tools.skoda.co.uk/';
    var modelKey;

    function getModelKey() {
		modelKey = $stats.attr('data-model-key');
    }
    
    function setUpHeight() {
        itemHeightsArray = [];
        $('.humanise-tabs__tab-content').css('display', 'block'); //show all tabs so we can calculate the height
        for (var i = 0; i < toggleButtons.length; i++) {
            var toggleContent =  toggleButtons[i].parentNode.querySelector('.humanise-stats__spec-details__toggle-content');
            itemHeightsArray[i] = toggleContent.querySelector('table').offsetHeight;
            toggleContent.setAttribute("data-item", i);
            if (toggleButtons[i].parentNode.classList.contains('open')) {
                toggleContent.style.maxHeight = itemHeightsArray[i]  + 'px';
            } else {
                toggleContent.style.maxHeight = '0px';
            }
        }
        $('.humanise-tabs__tab-content').css('display', '');    //remove added display so it reverts to CSS styling
    }
    
    function setUpToggle() {
        for (var i = 0; i < toggleButtons.length; i++) {
            toggleButtons[i].addEventListener('click', function() {
                item = this;
                toggleCopy(item);       
            });
        }
    }
    
    setUpToggle();
    
    window.addEventListener('resize', setUpHeight);
    
    function toggleCopy(thisItem) {
        var itemParent = thisItem.parentNode;
        var index = itemParent.querySelector('.humanise-stats__spec-details__toggle-content').getAttribute("data-item");
        if (itemParent.classList.contains('open')) {
            itemParent.classList.remove('open');
            itemParent.querySelector('.humanise-stats__spec-details__toggle-content').style.maxHeight = '0px';
        } else {
            itemParent.classList.add('open');
            itemParent.querySelector('.humanise-stats__spec-details__toggle-content').style.maxHeight = itemHeightsArray[index] + 'px';
        }       
    };    

    // get data and display
    
    var toggleSection = $stats.find('.humanise-stats__spec-details');
    var dropdownValues = null;
    
    // Headless API Client

    function getJson(url, callbackOk, callbackOther) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                callbackOk(xhr.status, JSON.parse(xhr.response));
            } else {
                callbackOther(xhr.status, xhr.response);
            }
        };
        xhr.send();
    };

    function getData(model, equipment, engine, callback, callbackOther) {
        //TODO make URL configurable
        getJson(apiUrl + "api/equipment" + formatParams({ body: model, equipment: equipment, engine: engine }),
            callback, callbackOther);
    }


    function formatParams(params) {
        return "?" +
            Object
                .keys(params)
                .map(function (key) {
                return key + "=" + encodeURIComponent(params[key]);
            })
                .join("&");
    }


    // Map JSON to Page
    
    function apply(data, elements) {
        elements.find("[data-contentpath]").each(function () {
            $(this).text(data[$(this).attr("data-contentpath")]);
        });
    }

    // Keep Feature tables / dropdowns up to date

    function getDataAndApply() {
        getModelKey();
        for (var i = 0; i < toggleSection.length; i++) {
            toggleSection[i].classList.remove('loaded');
        }
        getData(modelKey,
            getSelectedTrimId(),
            getSelectedEngineId(),
            function (status, response) { 
                apply(response, $stats);  
                setTimeout(function(){
                    setUpHeight();
                    for (var i = 0; i < toggleSection.length; i++) {
                        toggleSection[i].classList.add('loaded');
                    }
                }, 400);
            },
            function () { console.log("getDataAndApply fail"); });
    }

    function getSelectedTrimId() {
        return $($stats.find(".trim-selector").find(":selected")[0]).val();
    }

    function getSelectedEngineId() {
        return $($stats.find(".engine-selector").find(":selected")[0]).val();
    }

    function updateAvailableEngineSelections(callback) {
        var engineDropdownJRef = $stats.find(".engine-selector");
        engineDropdownJRef.empty();
        var engineDropdown = $stats.find(".engine-selector")[0];

        var selectedOptionVal = getSelectedTrimId();
        var selectedTrim = dropdownValues.trims.find(function (value) { return value.id == selectedOptionVal; });
        
        var trimImage = $stats.find('.trim-image')[0];
        trimImage.classList.remove('loaded');
        trimImage.src = apiUrl + selectedTrim.imagePath;
        trimImage.classList.add('loaded');

        var engines = selectedTrim.motors;

        if (engines && engines.length){
            for (var i = 0; i < engines.length; i++) {
                var item = engines[i];
                var newOption = document.createElement("option");
                newOption.setAttribute("value", item.id);
                var node = document.createTextNode(item.name);
                newOption.appendChild(node);
                engineDropdown.appendChild(newOption);               
            }            
        }
        callback();
    }

    function updateAvailableEngineSelectionsAndUpdateData() {
        updateAvailableEngineSelections(getDataAndApply);
    }
    
    function mapTrimDropdown(trimsEngines) {
        var trimDropdown = $stats.find(".trim-selector")[0];
        if (trimsEngines && trimsEngines.trims && trimsEngines.trims.length){
            for (var i = 0; i < trimsEngines.trims.length; i++) {
                var item = trimsEngines.trims[i];
                var newOption = document.createElement("option");
                newOption.setAttribute("value", item.id);
                var node = document.createTextNode(item.name);
                newOption.appendChild(node);
                trimDropdown.appendChild(newOption);                
            }            
        }
    }
    
    function loadDropDownValues(callback) {
        getModelKey();
        getJson(apiUrl + "api/ModelLineTrimsEngines/" + modelKey,
            function(status, response) {
                dropdownValues = response;
                callback();
            },
            function () {
                console.log("get drop down options failed");
            });
        }

    // drop downs behaviour init and initial feature tables values
    loadDropDownValues(function(){
        mapTrimDropdown(dropdownValues);
        updateAvailableEngineSelectionsAndUpdateData(); // updates main feature tables data
        $stats.find(".trim-selector").change(updateAvailableEngineSelectionsAndUpdateData);
        $stats.find(".engine-selector").change(getDataAndApply); // TODO: may clash with updating options
    });
    

}

$(document).ready(function(){
    if ($('.humanise-stats').length) {
    	$('.humanise-stats').each(function(){
    		initDBSDSpecs($(this));
    	});
    }
})



$(document).ready(function(){
	
	if ($('.humanise-quote-slider__list').length) {
		var sliderItem = document.querySelectorAll('.humanise-quote-slider__list');
		for (var i=0, numberOfItems = sliderItem.length; i < numberOfItems; i++) {
			var currentSliderItem = sliderItem[i];
			new Flickity(currentSliderItem, {
				resize: true,
				contain: false,
				prevNextButtons: false,
				pageDots: true,
				wrapAround: true,
				draggable: true,
				autoPlay: false
			});
		}
	}
	
});
$(document).ready(function () {
	
	if($('.humanise-sidebar-ctas').length){
		var td;
		var cc;

		var url = window.location.href;
		if ( url.indexOf("kodiaq") > -1 ) {
			var td = '/en-gb/models/kodiaq/test-drive-offer';
			var cc = 'http://cc-cloud.skoda-auto.com/gbr/gbr/en-gb?carline=67518';
		} else if ( url.indexOf("karoq") > -1 ) {
			var td = 'http://www.skoda.co.uk/tools/book-a-test-drive/?source=karoq';
			var cc = 'http://cc-cloud.skoda-auto.com/gbr/gbr/en-gb?carline=66328';
		}

		$('.humanise-sidebar-ctas__icon--test-drive').next().attr('href', td);
		$('.humanise-sidebar-ctas__icon--car-configutator').next().attr('href', cc);

		$('.humanise-sidebar-ctas__icon').mouseenter(function(){
			$('.humanise-sidebar-ctas__link').addClass('active');
		});

		$('.humanise-sidebar-ctas__icon').click(function(){
			$('.humanise-sidebar-ctas__link').toggleClass('active');
		});

		$(window).scroll(function(){
			$('.humanise-sidebar-ctas__link').removeClass('active');
		});

	}
});
if ( $(".humanise-tabs__tab-select--tab").length ){
	var startLeft = $(".humanise-tabs__tab-select--tab").first().position().left;
	$('.humanise-tabs__nav-wrapper--nav').css('left',startLeft+'px');

	$(".humanise-tabs__tab-select--tab").click(function(){
		$("li[role='tab']").attr("aria-selected","false"); //deselect all the tabs 
		$(this).attr("aria-selected","true");  // select this tab
		var posLeft = $(this).position().left;
		$('.humanise-tabs__nav-wrapper--nav').css('left',posLeft+'px');
		var tabpanid= $(this).attr("aria-controls"); //find out what tab panel this tab controls  
		var tabpan = $("#"+tabpanid);  
		$("div[role='tabpanel']").attr("aria-hidden","true"); //hide all the panels 
		tabpan.attr("aria-hidden","false");  // show our panel
	});

	$("li[role='tab']").keydown(function(ev) {
		if (ev.which ==13) {
			$(this).click()
		}
	});

	//This adds keyboard function that pressing an arrow left or arrow right from the tabs toggle the tabs. 
	$("li[role='tab']").keydown(function(ev) { 
		if ((ev.which ==39)||(ev.which ==37)) { 
			var selected= $(this).attr("aria-selected"); 
			if (selected =="true"){ 
				$("li[aria-selected='false']").attr("aria-selected","true").focus(); 
				$(this).attr("aria-selected","false"); 
				var tabpanid= $("li[aria-selected='true']").attr("aria-controls"); 
				var tabpan = $("#"+tabpanid); 
				$("div[role='tabpanel']").attr("aria-hidden","true"); 
				tabpan.attr("aria-hidden","false");
			}
		}
	});
}


$(document).ready(function(){
	
	if ($('.humanise-slider__list--one-item').length) {
		
		var sliderItem = document.querySelectorAll('.humanise-slider__list--one-item');
		for (var i=0, numberOfItems = sliderItem.length; i < numberOfItems; i++) {
			var currentSliderItem = sliderItem[i];
			new Flickity(currentSliderItem, {
				resize: true,
				contain: false,
				groupCells: 1,
				prevNextButtons: true,
				pageDots: false,
				wrapAround: true,
				draggable: true,
				autoPlay: false,
				on: {
					ready: function() {
						$(".humanise-slider__list--one-item .flickity-button").wrapAll("<div class='flickity-buttons'></div>");
						var imageHeight = $(".humanise-slider__list--one-item .humanise-slide__img").height();
						$(".humanise-slider__list--one-item .flickity-buttons").height(imageHeight);
											
						$(window).resize(function() {
						  imageHeight = $(".humanise-slider__list--one-item .humanise-slide__img").height();
						  $(".humanise-slider__list--one-item .flickity-buttons").height(imageHeight);
						});
											
					},
					change: function() {
						$(".humanise-slider__list--one-item .flickity-button").removeClass('show').addClass('hide');
					},
					settle: function() {
						$(".humanise-slider__list--one-item .flickity-button").removeClass('hide').addClass('show');
					}
				}
			});
		}
	
	}
	
});



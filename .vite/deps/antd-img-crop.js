import {
  button_default,
  modal_default,
  slider_default,
  upload_default
} from "./chunk-GXKW7ONT.js";
import "./chunk-CCXWZE7G.js";
import {
  version_default
} from "./chunk-D4PVBWVZ.js";
import "./chunk-DXOUNB47.js";
import "./chunk-E3YKSPS2.js";
import {
  require_react
} from "./chunk-JBG67EE7.js";
import {
  __commonJS,
  __toESM
} from "./chunk-UV5CTPV7.js";

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var React2 = require_react();
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var assign = Object.assign;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        var didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              {
                checkKeyStringCoercion(maybeKey);
              }
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self);
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum(source);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx2 = jsxWithValidationDynamic;
        var jsxs2 = jsxWithValidationStatic;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = jsx2;
        exports.jsxs = jsxs2;
      })();
    }
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/normalize-wheel/src/UserAgent_DEPRECATED.js
var require_UserAgent_DEPRECATED = __commonJS({
  "node_modules/normalize-wheel/src/UserAgent_DEPRECATED.js"(exports, module) {
    var _populated = false;
    var _ie;
    var _firefox;
    var _opera;
    var _webkit;
    var _chrome;
    var _ie_real_version;
    var _osx;
    var _windows;
    var _linux;
    var _android;
    var _win64;
    var _iphone;
    var _ipad;
    var _native;
    var _mobile;
    function _populate() {
      if (_populated) {
        return;
      }
      _populated = true;
      var uas = navigator.userAgent;
      var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
      var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);
      _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
      _ipad = /\b(iP[ao]d)/.exec(uas);
      _android = /Android/i.exec(uas);
      _native = /FBAN\/\w+;/i.exec(uas);
      _mobile = /Mobile/i.exec(uas);
      _win64 = !!/Win64/.exec(uas);
      if (agent) {
        _ie = agent[1] ? parseFloat(agent[1]) : agent[5] ? parseFloat(agent[5]) : NaN;
        if (_ie && document && document.documentMode) {
          _ie = document.documentMode;
        }
        var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
        _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;
        _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
        _opera = agent[3] ? parseFloat(agent[3]) : NaN;
        _webkit = agent[4] ? parseFloat(agent[4]) : NaN;
        if (_webkit) {
          agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
          _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
        } else {
          _chrome = NaN;
        }
      } else {
        _ie = _firefox = _opera = _chrome = _webkit = NaN;
      }
      if (os) {
        if (os[1]) {
          var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);
          _osx = ver ? parseFloat(ver[1].replace("_", ".")) : true;
        } else {
          _osx = false;
        }
        _windows = !!os[2];
        _linux = !!os[3];
      } else {
        _osx = _windows = _linux = false;
      }
    }
    var UserAgent_DEPRECATED = {
      /**
       *  Check if the UA is Internet Explorer.
       *
       *
       *  @return float|NaN Version number (if match) or NaN.
       */
      ie: function() {
        return _populate() || _ie;
      },
      /**
       * Check if we're in Internet Explorer compatibility mode.
       *
       * @return bool true if in compatibility mode, false if
       * not compatibility mode or not ie
       */
      ieCompatibilityMode: function() {
        return _populate() || _ie_real_version > _ie;
      },
      /**
       * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
       * only need this because Skype can't handle 64-bit IE yet.  We need to remove
       * this when we don't need it -- tracked by #601957.
       */
      ie64: function() {
        return UserAgent_DEPRECATED.ie() && _win64;
      },
      /**
       *  Check if the UA is Firefox.
       *
       *
       *  @return float|NaN Version number (if match) or NaN.
       */
      firefox: function() {
        return _populate() || _firefox;
      },
      /**
       *  Check if the UA is Opera.
       *
       *
       *  @return float|NaN Version number (if match) or NaN.
       */
      opera: function() {
        return _populate() || _opera;
      },
      /**
       *  Check if the UA is WebKit.
       *
       *
       *  @return float|NaN Version number (if match) or NaN.
       */
      webkit: function() {
        return _populate() || _webkit;
      },
      /**
       *  For Push
       *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
       */
      safari: function() {
        return UserAgent_DEPRECATED.webkit();
      },
      /**
       *  Check if the UA is a Chrome browser.
       *
       *
       *  @return float|NaN Version number (if match) or NaN.
       */
      chrome: function() {
        return _populate() || _chrome;
      },
      /**
       *  Check if the user is running Windows.
       *
       *  @return bool `true' if the user's OS is Windows.
       */
      windows: function() {
        return _populate() || _windows;
      },
      /**
       *  Check if the user is running Mac OS X.
       *
       *  @return float|bool   Returns a float if a version number is detected,
       *                       otherwise true/false.
       */
      osx: function() {
        return _populate() || _osx;
      },
      /**
       * Check if the user is running Linux.
       *
       * @return bool `true' if the user's OS is some flavor of Linux.
       */
      linux: function() {
        return _populate() || _linux;
      },
      /**
       * Check if the user is running on an iPhone or iPod platform.
       *
       * @return bool `true' if the user is running some flavor of the
       *    iPhone OS.
       */
      iphone: function() {
        return _populate() || _iphone;
      },
      mobile: function() {
        return _populate() || (_iphone || _ipad || _android || _mobile);
      },
      nativeApp: function() {
        return _populate() || _native;
      },
      android: function() {
        return _populate() || _android;
      },
      ipad: function() {
        return _populate() || _ipad;
      }
    };
    module.exports = UserAgent_DEPRECATED;
  }
});

// node_modules/normalize-wheel/src/ExecutionEnvironment.js
var require_ExecutionEnvironment = __commonJS({
  "node_modules/normalize-wheel/src/ExecutionEnvironment.js"(exports, module) {
    "use strict";
    var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
    var ExecutionEnvironment = {
      canUseDOM,
      canUseWorkers: typeof Worker !== "undefined",
      canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
      canUseViewport: canUseDOM && !!window.screen,
      isInWorker: !canUseDOM
      // For now, this is true - might change in the future.
    };
    module.exports = ExecutionEnvironment;
  }
});

// node_modules/normalize-wheel/src/isEventSupported.js
var require_isEventSupported = __commonJS({
  "node_modules/normalize-wheel/src/isEventSupported.js"(exports, module) {
    "use strict";
    var ExecutionEnvironment = require_ExecutionEnvironment();
    var useHasFeature;
    if (ExecutionEnvironment.canUseDOM) {
      useHasFeature = document.implementation && document.implementation.hasFeature && // always returns true in newer browsers as per the standard.
      // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
      document.implementation.hasFeature("", "") !== true;
    }
    function isEventSupported(eventNameSuffix, capture) {
      if (!ExecutionEnvironment.canUseDOM || capture && !("addEventListener" in document)) {
        return false;
      }
      var eventName = "on" + eventNameSuffix;
      var isSupported = eventName in document;
      if (!isSupported) {
        var element = document.createElement("div");
        element.setAttribute(eventName, "return;");
        isSupported = typeof element[eventName] === "function";
      }
      if (!isSupported && useHasFeature && eventNameSuffix === "wheel") {
        isSupported = document.implementation.hasFeature("Events.wheel", "3.0");
      }
      return isSupported;
    }
    module.exports = isEventSupported;
  }
});

// node_modules/normalize-wheel/src/normalizeWheel.js
var require_normalizeWheel = __commonJS({
  "node_modules/normalize-wheel/src/normalizeWheel.js"(exports, module) {
    "use strict";
    var UserAgent_DEPRECATED = require_UserAgent_DEPRECATED();
    var isEventSupported = require_isEventSupported();
    var PIXEL_STEP = 10;
    var LINE_HEIGHT = 40;
    var PAGE_HEIGHT = 800;
    function normalizeWheel2(event) {
      var sX = 0, sY = 0, pX = 0, pY = 0;
      if ("detail" in event) {
        sY = event.detail;
      }
      if ("wheelDelta" in event) {
        sY = -event.wheelDelta / 120;
      }
      if ("wheelDeltaY" in event) {
        sY = -event.wheelDeltaY / 120;
      }
      if ("wheelDeltaX" in event) {
        sX = -event.wheelDeltaX / 120;
      }
      if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }
      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;
      if ("deltaY" in event) {
        pY = event.deltaY;
      }
      if ("deltaX" in event) {
        pX = event.deltaX;
      }
      if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode == 1) {
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }
      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }
      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }
      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    }
    normalizeWheel2.getEventType = function() {
      return UserAgent_DEPRECATED.firefox() ? "DOMMouseScroll" : isEventSupported("wheel") ? "wheel" : "mousewheel";
    };
    module.exports = normalizeWheel2;
  }
});

// node_modules/normalize-wheel/index.js
var require_normalize_wheel = __commonJS({
  "node_modules/normalize-wheel/index.js"(exports, module) {
    module.exports = require_normalizeWheel();
  }
});

// node_modules/tslib/tslib.es6.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

// node_modules/antd-img-crop/dist/antd-img-crop.esm.js
var import_jsx_runtime = __toESM(require_jsx_runtime());

// node_modules/compare-versions/lib/esm/utils.js
var semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
var validateAndParse = (version) => {
  if (typeof version !== "string") {
    throw new TypeError("Invalid argument expected string");
  }
  const match = version.match(semver);
  if (!match) {
    throw new Error(`Invalid argument not valid semver ('${version}' received)`);
  }
  match.shift();
  return match;
};
var isWildcard = (s) => s === "*" || s === "x" || s === "X";
var tryParse = (v) => {
  const n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};
var forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
var compareStrings = (a, b) => {
  if (isWildcard(a) || isWildcard(b))
    return 0;
  const [ap, bp] = forceType(tryParse(a), tryParse(b));
  if (ap > bp)
    return 1;
  if (ap < bp)
    return -1;
  return 0;
};
var compareSegments = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const r = compareStrings(a[i] || "0", b[i] || "0");
    if (r !== 0)
      return r;
  }
  return 0;
};

// node_modules/compare-versions/lib/esm/compareVersions.js
var compareVersions = (v1, v2) => {
  const n1 = validateAndParse(v1);
  const n2 = validateAndParse(v2);
  const p1 = n1.pop();
  const p2 = n2.pop();
  const r = compareSegments(n1, n2);
  if (r !== 0)
    return r;
  if (p1 && p2) {
    return compareSegments(p1.split("."), p2.split("."));
  } else if (p1 || p2) {
    return p1 ? -1 : 1;
  }
  return 0;
};

// node_modules/compare-versions/lib/esm/compare.js
var operatorResMap = {
  ">": [1],
  ">=": [0, 1],
  "=": [0],
  "<=": [-1, 0],
  "<": [-1],
  "!=": [-1, 1]
};
var allowedOperators = Object.keys(operatorResMap);

// node_modules/antd-img-crop/dist/antd-img-crop.esm.js
var import_react = __toESM(require_react());

// node_modules/react-easy-crop/index.module.js
var React = __toESM(require_react());
var import_normalize_wheel = __toESM(require_normalize_wheel());
function getCropSize(mediaWidth, mediaHeight, containerWidth, containerHeight, aspect, rotation) {
  if (rotation === void 0) {
    rotation = 0;
  }
  var _a = rotateSize(mediaWidth, mediaHeight, rotation), width = _a.width, height = _a.height;
  var fittingWidth = Math.min(width, containerWidth);
  var fittingHeight = Math.min(height, containerHeight);
  if (fittingWidth > fittingHeight * aspect) {
    return {
      width: fittingHeight * aspect,
      height: fittingHeight
    };
  }
  return {
    width: fittingWidth,
    height: fittingWidth / aspect
  };
}
function getMediaZoom(mediaSize) {
  return mediaSize.width > mediaSize.height ? mediaSize.width / mediaSize.naturalWidth : mediaSize.height / mediaSize.naturalHeight;
}
function restrictPosition(position, mediaSize, cropSize, zoom, rotation) {
  if (rotation === void 0) {
    rotation = 0;
  }
  var _a = rotateSize(mediaSize.width, mediaSize.height, rotation), width = _a.width, height = _a.height;
  return {
    x: restrictPositionCoord(position.x, width, cropSize.width, zoom),
    y: restrictPositionCoord(position.y, height, cropSize.height, zoom)
  };
}
function restrictPositionCoord(position, mediaSize, cropSize, zoom) {
  var maxPosition = mediaSize * zoom / 2 - cropSize / 2;
  return clamp(position, -maxPosition, maxPosition);
}
function getDistanceBetweenPoints(pointA, pointB) {
  return Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2));
}
function getRotationBetweenPoints(pointA, pointB) {
  return Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180 / Math.PI;
}
function computeCroppedArea(crop, mediaSize, cropSize, aspect, zoom, rotation, restrictPosition2) {
  if (rotation === void 0) {
    rotation = 0;
  }
  if (restrictPosition2 === void 0) {
    restrictPosition2 = true;
  }
  var limitAreaFn = restrictPosition2 ? limitArea : noOp;
  var mediaBBoxSize = rotateSize(mediaSize.width, mediaSize.height, rotation);
  var mediaNaturalBBoxSize = rotateSize(mediaSize.naturalWidth, mediaSize.naturalHeight, rotation);
  var croppedAreaPercentages = {
    x: limitAreaFn(100, ((mediaBBoxSize.width - cropSize.width / zoom) / 2 - crop.x / zoom) / mediaBBoxSize.width * 100),
    y: limitAreaFn(100, ((mediaBBoxSize.height - cropSize.height / zoom) / 2 - crop.y / zoom) / mediaBBoxSize.height * 100),
    width: limitAreaFn(100, cropSize.width / mediaBBoxSize.width * 100 / zoom),
    height: limitAreaFn(100, cropSize.height / mediaBBoxSize.height * 100 / zoom)
  };
  var widthInPixels = Math.round(limitAreaFn(mediaNaturalBBoxSize.width, croppedAreaPercentages.width * mediaNaturalBBoxSize.width / 100));
  var heightInPixels = Math.round(limitAreaFn(mediaNaturalBBoxSize.height, croppedAreaPercentages.height * mediaNaturalBBoxSize.height / 100));
  var isImgWiderThanHigh = mediaNaturalBBoxSize.width >= mediaNaturalBBoxSize.height * aspect;
  var sizePixels = isImgWiderThanHigh ? {
    width: Math.round(heightInPixels * aspect),
    height: heightInPixels
  } : {
    width: widthInPixels,
    height: Math.round(widthInPixels / aspect)
  };
  var croppedAreaPixels = __assign(__assign({}, sizePixels), {
    x: Math.round(limitAreaFn(mediaNaturalBBoxSize.width - sizePixels.width, croppedAreaPercentages.x * mediaNaturalBBoxSize.width / 100)),
    y: Math.round(limitAreaFn(mediaNaturalBBoxSize.height - sizePixels.height, croppedAreaPercentages.y * mediaNaturalBBoxSize.height / 100))
  });
  return {
    croppedAreaPercentages,
    croppedAreaPixels
  };
}
function limitArea(max, value) {
  return Math.min(max, Math.max(0, value));
}
function noOp(_max, value) {
  return value;
}
function getInitialCropFromCroppedAreaPercentages(croppedAreaPercentages, mediaSize, rotation, cropSize, minZoom, maxZoom) {
  var mediaBBoxSize = rotateSize(mediaSize.width, mediaSize.height, rotation);
  var zoom = clamp(cropSize.width / mediaBBoxSize.width * (100 / croppedAreaPercentages.width), minZoom, maxZoom);
  var crop = {
    x: zoom * mediaBBoxSize.width / 2 - cropSize.width / 2 - mediaBBoxSize.width * zoom * (croppedAreaPercentages.x / 100),
    y: zoom * mediaBBoxSize.height / 2 - cropSize.height / 2 - mediaBBoxSize.height * zoom * (croppedAreaPercentages.y / 100)
  };
  return {
    crop,
    zoom
  };
}
function getZoomFromCroppedAreaPixels(croppedAreaPixels, mediaSize, cropSize) {
  var mediaZoom = getMediaZoom(mediaSize);
  return cropSize.height > cropSize.width ? cropSize.height / (croppedAreaPixels.height * mediaZoom) : cropSize.width / (croppedAreaPixels.width * mediaZoom);
}
function getInitialCropFromCroppedAreaPixels(croppedAreaPixels, mediaSize, rotation, cropSize, minZoom, maxZoom) {
  if (rotation === void 0) {
    rotation = 0;
  }
  var mediaNaturalBBoxSize = rotateSize(mediaSize.naturalWidth, mediaSize.naturalHeight, rotation);
  var zoom = clamp(getZoomFromCroppedAreaPixels(croppedAreaPixels, mediaSize, cropSize), minZoom, maxZoom);
  var cropZoom = cropSize.height > cropSize.width ? cropSize.height / croppedAreaPixels.height : cropSize.width / croppedAreaPixels.width;
  var crop = {
    x: ((mediaNaturalBBoxSize.width - croppedAreaPixels.width) / 2 - croppedAreaPixels.x) * cropZoom,
    y: ((mediaNaturalBBoxSize.height - croppedAreaPixels.height) / 2 - croppedAreaPixels.y) * cropZoom
  };
  return {
    crop,
    zoom
  };
}
function getCenter(a, b) {
  return {
    x: (b.x + a.x) / 2,
    y: (b.y + a.y) / 2
  };
}
function getRadianAngle(degreeValue) {
  return degreeValue * Math.PI / 180;
}
function rotateSize(width, height, rotation) {
  var rotRad = getRadianAngle(rotation);
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
  };
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function classNames() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return args.filter(function(value) {
    if (typeof value === "string" && value.length > 0) {
      return true;
    }
    return false;
  }).join(" ").trim();
}
var css_248z = ".reactEasyCrop_Container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n  user-select: none;\n  touch-action: none;\n  cursor: move;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.reactEasyCrop_Image,\n.reactEasyCrop_Video {\n  will-change: transform; /* this improves performances and prevent painting issues on iOS Chrome */\n}\n\n.reactEasyCrop_Contain {\n  max-width: 100%;\n  max-height: 100%;\n  margin: auto;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.reactEasyCrop_Cover_Horizontal {\n  width: 100%;\n  height: auto;\n}\n.reactEasyCrop_Cover_Vertical {\n  width: auto;\n  height: 100%;\n}\n\n.reactEasyCrop_CropArea {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  box-sizing: border-box;\n  box-shadow: 0 0 0 9999em;\n  color: rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n}\n\n.reactEasyCrop_CropAreaRound {\n  border-radius: 50%;\n}\n\n.reactEasyCrop_CropAreaGrid::before {\n  content: ' ';\n  box-sizing: border-box;\n  position: absolute;\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  top: 0;\n  bottom: 0;\n  left: 33.33%;\n  right: 33.33%;\n  border-top: 0;\n  border-bottom: 0;\n}\n\n.reactEasyCrop_CropAreaGrid::after {\n  content: ' ';\n  box-sizing: border-box;\n  position: absolute;\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  top: 33.33%;\n  bottom: 33.33%;\n  left: 0;\n  right: 0;\n  border-left: 0;\n  border-right: 0;\n}\n";
var MIN_ZOOM = 1;
var MAX_ZOOM = 3;
var Cropper = (
  /** @class */
  function(_super) {
    __extends(Cropper2, _super);
    function Cropper2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.imageRef = React.createRef();
      _this.videoRef = React.createRef();
      _this.containerPosition = {
        x: 0,
        y: 0
      };
      _this.containerRef = null;
      _this.styleRef = null;
      _this.containerRect = null;
      _this.mediaSize = {
        width: 0,
        height: 0,
        naturalWidth: 0,
        naturalHeight: 0
      };
      _this.dragStartPosition = {
        x: 0,
        y: 0
      };
      _this.dragStartCrop = {
        x: 0,
        y: 0
      };
      _this.gestureZoomStart = 0;
      _this.gestureRotationStart = 0;
      _this.isTouching = false;
      _this.lastPinchDistance = 0;
      _this.lastPinchRotation = 0;
      _this.rafDragTimeout = null;
      _this.rafPinchTimeout = null;
      _this.wheelTimer = null;
      _this.currentDoc = typeof document !== "undefined" ? document : null;
      _this.currentWindow = typeof window !== "undefined" ? window : null;
      _this.resizeObserver = null;
      _this.state = {
        cropSize: null,
        hasWheelJustStarted: false,
        mediaObjectFit: void 0
      };
      _this.initResizeObserver = function() {
        if (typeof window.ResizeObserver === "undefined" || !_this.containerRef) {
          return;
        }
        var isFirstResize = true;
        _this.resizeObserver = new window.ResizeObserver(function(entries) {
          if (isFirstResize) {
            isFirstResize = false;
            return;
          }
          _this.computeSizes();
        });
        _this.resizeObserver.observe(_this.containerRef);
      };
      _this.preventZoomSafari = function(e) {
        return e.preventDefault();
      };
      _this.cleanEvents = function() {
        if (!_this.currentDoc)
          return;
        _this.currentDoc.removeEventListener("mousemove", _this.onMouseMove);
        _this.currentDoc.removeEventListener("mouseup", _this.onDragStopped);
        _this.currentDoc.removeEventListener("touchmove", _this.onTouchMove);
        _this.currentDoc.removeEventListener("touchend", _this.onDragStopped);
        _this.currentDoc.removeEventListener("gesturemove", _this.onGestureMove);
        _this.currentDoc.removeEventListener("gestureend", _this.onGestureEnd);
        _this.currentDoc.removeEventListener("scroll", _this.onScroll);
      };
      _this.clearScrollEvent = function() {
        if (_this.containerRef)
          _this.containerRef.removeEventListener("wheel", _this.onWheel);
        if (_this.wheelTimer) {
          clearTimeout(_this.wheelTimer);
        }
      };
      _this.onMediaLoad = function() {
        var cropSize = _this.computeSizes();
        if (cropSize) {
          _this.emitCropData();
          _this.setInitialCrop(cropSize);
        }
        if (_this.props.onMediaLoaded) {
          _this.props.onMediaLoaded(_this.mediaSize);
        }
      };
      _this.setInitialCrop = function(cropSize) {
        if (_this.props.initialCroppedAreaPercentages) {
          var _a = getInitialCropFromCroppedAreaPercentages(_this.props.initialCroppedAreaPercentages, _this.mediaSize, _this.props.rotation, cropSize, _this.props.minZoom, _this.props.maxZoom), crop = _a.crop, zoom = _a.zoom;
          _this.props.onCropChange(crop);
          _this.props.onZoomChange && _this.props.onZoomChange(zoom);
        } else if (_this.props.initialCroppedAreaPixels) {
          var _b = getInitialCropFromCroppedAreaPixels(_this.props.initialCroppedAreaPixels, _this.mediaSize, _this.props.rotation, cropSize, _this.props.minZoom, _this.props.maxZoom), crop = _b.crop, zoom = _b.zoom;
          _this.props.onCropChange(crop);
          _this.props.onZoomChange && _this.props.onZoomChange(zoom);
        }
      };
      _this.computeSizes = function() {
        var _a, _b, _c, _d, _e, _f;
        var mediaRef = _this.imageRef.current || _this.videoRef.current;
        if (mediaRef && _this.containerRef) {
          _this.containerRect = _this.containerRef.getBoundingClientRect();
          _this.saveContainerPosition();
          var containerAspect = _this.containerRect.width / _this.containerRect.height;
          var naturalWidth = ((_a = _this.imageRef.current) === null || _a === void 0 ? void 0 : _a.naturalWidth) || ((_b = _this.videoRef.current) === null || _b === void 0 ? void 0 : _b.videoWidth) || 0;
          var naturalHeight = ((_c = _this.imageRef.current) === null || _c === void 0 ? void 0 : _c.naturalHeight) || ((_d = _this.videoRef.current) === null || _d === void 0 ? void 0 : _d.videoHeight) || 0;
          var isMediaScaledDown = mediaRef.offsetWidth < naturalWidth || mediaRef.offsetHeight < naturalHeight;
          var mediaAspect = naturalWidth / naturalHeight;
          var renderedMediaSize = void 0;
          if (isMediaScaledDown) {
            switch (_this.state.mediaObjectFit) {
              default:
              case "contain":
                renderedMediaSize = containerAspect > mediaAspect ? {
                  width: _this.containerRect.height * mediaAspect,
                  height: _this.containerRect.height
                } : {
                  width: _this.containerRect.width,
                  height: _this.containerRect.width / mediaAspect
                };
                break;
              case "horizontal-cover":
                renderedMediaSize = {
                  width: _this.containerRect.width,
                  height: _this.containerRect.width / mediaAspect
                };
                break;
              case "vertical-cover":
                renderedMediaSize = {
                  width: _this.containerRect.height * mediaAspect,
                  height: _this.containerRect.height
                };
                break;
            }
          } else {
            renderedMediaSize = {
              width: mediaRef.offsetWidth,
              height: mediaRef.offsetHeight
            };
          }
          _this.mediaSize = __assign(__assign({}, renderedMediaSize), {
            naturalWidth,
            naturalHeight
          });
          if (_this.props.setMediaSize) {
            _this.props.setMediaSize(_this.mediaSize);
          }
          var cropSize = _this.props.cropSize ? _this.props.cropSize : getCropSize(_this.mediaSize.width, _this.mediaSize.height, _this.containerRect.width, _this.containerRect.height, _this.props.aspect, _this.props.rotation);
          if (((_e = _this.state.cropSize) === null || _e === void 0 ? void 0 : _e.height) !== cropSize.height || ((_f = _this.state.cropSize) === null || _f === void 0 ? void 0 : _f.width) !== cropSize.width) {
            _this.props.onCropSizeChange && _this.props.onCropSizeChange(cropSize);
          }
          _this.setState({
            cropSize
          }, _this.recomputeCropPosition);
          if (_this.props.setCropSize) {
            _this.props.setCropSize(cropSize);
          }
          return cropSize;
        }
      };
      _this.saveContainerPosition = function() {
        if (_this.containerRef) {
          var bounds = _this.containerRef.getBoundingClientRect();
          _this.containerPosition = {
            x: bounds.left,
            y: bounds.top
          };
        }
      };
      _this.onMouseDown = function(e) {
        if (!_this.currentDoc)
          return;
        e.preventDefault();
        _this.currentDoc.addEventListener("mousemove", _this.onMouseMove);
        _this.currentDoc.addEventListener("mouseup", _this.onDragStopped);
        _this.saveContainerPosition();
        _this.onDragStart(Cropper2.getMousePoint(e));
      };
      _this.onMouseMove = function(e) {
        return _this.onDrag(Cropper2.getMousePoint(e));
      };
      _this.onScroll = function(e) {
        if (!_this.currentDoc)
          return;
        e.preventDefault();
        _this.saveContainerPosition();
      };
      _this.onTouchStart = function(e) {
        if (!_this.currentDoc)
          return;
        _this.isTouching = true;
        if (_this.props.onTouchRequest && !_this.props.onTouchRequest(e)) {
          return;
        }
        _this.currentDoc.addEventListener("touchmove", _this.onTouchMove, {
          passive: false
        });
        _this.currentDoc.addEventListener("touchend", _this.onDragStopped);
        _this.saveContainerPosition();
        if (e.touches.length === 2) {
          _this.onPinchStart(e);
        } else if (e.touches.length === 1) {
          _this.onDragStart(Cropper2.getTouchPoint(e.touches[0]));
        }
      };
      _this.onTouchMove = function(e) {
        e.preventDefault();
        if (e.touches.length === 2) {
          _this.onPinchMove(e);
        } else if (e.touches.length === 1) {
          _this.onDrag(Cropper2.getTouchPoint(e.touches[0]));
        }
      };
      _this.onGestureStart = function(e) {
        if (!_this.currentDoc)
          return;
        e.preventDefault();
        _this.currentDoc.addEventListener("gesturechange", _this.onGestureMove);
        _this.currentDoc.addEventListener("gestureend", _this.onGestureEnd);
        _this.gestureZoomStart = _this.props.zoom;
        _this.gestureRotationStart = _this.props.rotation;
      };
      _this.onGestureMove = function(e) {
        e.preventDefault();
        if (_this.isTouching) {
          return;
        }
        var point = Cropper2.getMousePoint(e);
        var newZoom = _this.gestureZoomStart - 1 + e.scale;
        _this.setNewZoom(newZoom, point, {
          shouldUpdatePosition: true
        });
        if (_this.props.onRotationChange) {
          var newRotation = _this.gestureRotationStart + e.rotation;
          _this.props.onRotationChange(newRotation);
        }
      };
      _this.onGestureEnd = function(e) {
        _this.cleanEvents();
      };
      _this.onDragStart = function(_a) {
        var _b, _c;
        var x = _a.x, y = _a.y;
        _this.dragStartPosition = {
          x,
          y
        };
        _this.dragStartCrop = __assign({}, _this.props.crop);
        (_c = (_b = _this.props).onInteractionStart) === null || _c === void 0 ? void 0 : _c.call(_b);
      };
      _this.onDrag = function(_a) {
        var x = _a.x, y = _a.y;
        if (!_this.currentWindow)
          return;
        if (_this.rafDragTimeout)
          _this.currentWindow.cancelAnimationFrame(_this.rafDragTimeout);
        _this.rafDragTimeout = _this.currentWindow.requestAnimationFrame(function() {
          if (!_this.state.cropSize)
            return;
          if (x === void 0 || y === void 0)
            return;
          var offsetX = x - _this.dragStartPosition.x;
          var offsetY = y - _this.dragStartPosition.y;
          var requestedPosition = {
            x: _this.dragStartCrop.x + offsetX,
            y: _this.dragStartCrop.y + offsetY
          };
          var newPosition = _this.props.restrictPosition ? restrictPosition(requestedPosition, _this.mediaSize, _this.state.cropSize, _this.props.zoom, _this.props.rotation) : requestedPosition;
          _this.props.onCropChange(newPosition);
        });
      };
      _this.onDragStopped = function() {
        var _a, _b;
        _this.isTouching = false;
        _this.cleanEvents();
        _this.emitCropData();
        (_b = (_a = _this.props).onInteractionEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
      };
      _this.onWheel = function(e) {
        if (!_this.currentWindow)
          return;
        if (_this.props.onWheelRequest && !_this.props.onWheelRequest(e)) {
          return;
        }
        e.preventDefault();
        var point = Cropper2.getMousePoint(e);
        var pixelY = (0, import_normalize_wheel.default)(e).pixelY;
        var newZoom = _this.props.zoom - pixelY * _this.props.zoomSpeed / 200;
        _this.setNewZoom(newZoom, point, {
          shouldUpdatePosition: true
        });
        if (!_this.state.hasWheelJustStarted) {
          _this.setState({
            hasWheelJustStarted: true
          }, function() {
            var _a, _b;
            return (_b = (_a = _this.props).onInteractionStart) === null || _b === void 0 ? void 0 : _b.call(_a);
          });
        }
        if (_this.wheelTimer) {
          clearTimeout(_this.wheelTimer);
        }
        _this.wheelTimer = _this.currentWindow.setTimeout(function() {
          return _this.setState({
            hasWheelJustStarted: false
          }, function() {
            var _a, _b;
            return (_b = (_a = _this.props).onInteractionEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
          });
        }, 250);
      };
      _this.getPointOnContainer = function(_a, containerTopLeft) {
        var x = _a.x, y = _a.y;
        if (!_this.containerRect) {
          throw new Error("The Cropper is not mounted");
        }
        return {
          x: _this.containerRect.width / 2 - (x - containerTopLeft.x),
          y: _this.containerRect.height / 2 - (y - containerTopLeft.y)
        };
      };
      _this.getPointOnMedia = function(_a) {
        var x = _a.x, y = _a.y;
        var _b = _this.props, crop = _b.crop, zoom = _b.zoom;
        return {
          x: (x + crop.x) / zoom,
          y: (y + crop.y) / zoom
        };
      };
      _this.setNewZoom = function(zoom, point, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.shouldUpdatePosition, shouldUpdatePosition = _c === void 0 ? true : _c;
        if (!_this.state.cropSize || !_this.props.onZoomChange)
          return;
        var newZoom = clamp(zoom, _this.props.minZoom, _this.props.maxZoom);
        if (shouldUpdatePosition) {
          var zoomPoint = _this.getPointOnContainer(point, _this.containerPosition);
          var zoomTarget = _this.getPointOnMedia(zoomPoint);
          var requestedPosition = {
            x: zoomTarget.x * newZoom - zoomPoint.x,
            y: zoomTarget.y * newZoom - zoomPoint.y
          };
          var newPosition = _this.props.restrictPosition ? restrictPosition(requestedPosition, _this.mediaSize, _this.state.cropSize, newZoom, _this.props.rotation) : requestedPosition;
          _this.props.onCropChange(newPosition);
        }
        _this.props.onZoomChange(newZoom);
      };
      _this.getCropData = function() {
        if (!_this.state.cropSize) {
          return null;
        }
        var restrictedPosition = _this.props.restrictPosition ? restrictPosition(_this.props.crop, _this.mediaSize, _this.state.cropSize, _this.props.zoom, _this.props.rotation) : _this.props.crop;
        return computeCroppedArea(restrictedPosition, _this.mediaSize, _this.state.cropSize, _this.getAspect(), _this.props.zoom, _this.props.rotation, _this.props.restrictPosition);
      };
      _this.emitCropData = function() {
        var cropData = _this.getCropData();
        if (!cropData)
          return;
        var croppedAreaPercentages = cropData.croppedAreaPercentages, croppedAreaPixels = cropData.croppedAreaPixels;
        if (_this.props.onCropComplete) {
          _this.props.onCropComplete(croppedAreaPercentages, croppedAreaPixels);
        }
        if (_this.props.onCropAreaChange) {
          _this.props.onCropAreaChange(croppedAreaPercentages, croppedAreaPixels);
        }
      };
      _this.emitCropAreaChange = function() {
        var cropData = _this.getCropData();
        if (!cropData)
          return;
        var croppedAreaPercentages = cropData.croppedAreaPercentages, croppedAreaPixels = cropData.croppedAreaPixels;
        if (_this.props.onCropAreaChange) {
          _this.props.onCropAreaChange(croppedAreaPercentages, croppedAreaPixels);
        }
      };
      _this.recomputeCropPosition = function() {
        if (!_this.state.cropSize)
          return;
        var newPosition = _this.props.restrictPosition ? restrictPosition(_this.props.crop, _this.mediaSize, _this.state.cropSize, _this.props.zoom, _this.props.rotation) : _this.props.crop;
        _this.props.onCropChange(newPosition);
        _this.emitCropData();
      };
      return _this;
    }
    Cropper2.prototype.componentDidMount = function() {
      if (!this.currentDoc || !this.currentWindow)
        return;
      if (this.containerRef) {
        if (this.containerRef.ownerDocument) {
          this.currentDoc = this.containerRef.ownerDocument;
        }
        if (this.currentDoc.defaultView) {
          this.currentWindow = this.currentDoc.defaultView;
        }
        this.initResizeObserver();
        if (typeof window.ResizeObserver === "undefined") {
          this.currentWindow.addEventListener("resize", this.computeSizes);
        }
        this.props.zoomWithScroll && this.containerRef.addEventListener("wheel", this.onWheel, {
          passive: false
        });
        this.containerRef.addEventListener("gesturestart", this.onGestureStart);
      }
      this.currentDoc.addEventListener("scroll", this.onScroll);
      if (!this.props.disableAutomaticStylesInjection) {
        this.styleRef = this.currentDoc.createElement("style");
        this.styleRef.setAttribute("type", "text/css");
        if (this.props.nonce) {
          this.styleRef.setAttribute("nonce", this.props.nonce);
        }
        this.styleRef.innerHTML = css_248z;
        this.currentDoc.head.appendChild(this.styleRef);
      }
      if (this.imageRef.current && this.imageRef.current.complete) {
        this.onMediaLoad();
      }
      if (this.props.setImageRef) {
        this.props.setImageRef(this.imageRef);
      }
      if (this.props.setVideoRef) {
        this.props.setVideoRef(this.videoRef);
      }
    };
    Cropper2.prototype.componentWillUnmount = function() {
      var _a, _b;
      if (!this.currentDoc || !this.currentWindow)
        return;
      if (typeof window.ResizeObserver === "undefined") {
        this.currentWindow.removeEventListener("resize", this.computeSizes);
      }
      (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
      if (this.containerRef) {
        this.containerRef.removeEventListener("gesturestart", this.preventZoomSafari);
      }
      if (this.styleRef) {
        (_b = this.styleRef.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(this.styleRef);
      }
      this.cleanEvents();
      this.props.zoomWithScroll && this.clearScrollEvent();
    };
    Cropper2.prototype.componentDidUpdate = function(prevProps) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      if (prevProps.rotation !== this.props.rotation) {
        this.computeSizes();
        this.recomputeCropPosition();
      } else if (prevProps.aspect !== this.props.aspect) {
        this.computeSizes();
      } else if (prevProps.objectFit !== this.props.objectFit) {
        this.computeSizes();
      } else if (prevProps.zoom !== this.props.zoom) {
        this.recomputeCropPosition();
      } else if (((_a = prevProps.cropSize) === null || _a === void 0 ? void 0 : _a.height) !== ((_b = this.props.cropSize) === null || _b === void 0 ? void 0 : _b.height) || ((_c = prevProps.cropSize) === null || _c === void 0 ? void 0 : _c.width) !== ((_d = this.props.cropSize) === null || _d === void 0 ? void 0 : _d.width)) {
        this.computeSizes();
      } else if (((_e = prevProps.crop) === null || _e === void 0 ? void 0 : _e.x) !== ((_f = this.props.crop) === null || _f === void 0 ? void 0 : _f.x) || ((_g = prevProps.crop) === null || _g === void 0 ? void 0 : _g.y) !== ((_h = this.props.crop) === null || _h === void 0 ? void 0 : _h.y)) {
        this.emitCropAreaChange();
      }
      if (prevProps.zoomWithScroll !== this.props.zoomWithScroll && this.containerRef) {
        this.props.zoomWithScroll ? this.containerRef.addEventListener("wheel", this.onWheel, {
          passive: false
        }) : this.clearScrollEvent();
      }
      if (prevProps.video !== this.props.video) {
        (_j = this.videoRef.current) === null || _j === void 0 ? void 0 : _j.load();
      }
      var objectFit = this.getObjectFit();
      if (objectFit !== this.state.mediaObjectFit) {
        this.setState({
          mediaObjectFit: objectFit
        }, this.computeSizes);
      }
    };
    Cropper2.prototype.getAspect = function() {
      var _a = this.props, cropSize = _a.cropSize, aspect = _a.aspect;
      if (cropSize) {
        return cropSize.width / cropSize.height;
      }
      return aspect;
    };
    Cropper2.prototype.getObjectFit = function() {
      var _a, _b, _c, _d;
      if (this.props.objectFit === "cover") {
        var mediaRef = this.imageRef.current || this.videoRef.current;
        if (mediaRef && this.containerRef) {
          this.containerRect = this.containerRef.getBoundingClientRect();
          var containerAspect = this.containerRect.width / this.containerRect.height;
          var naturalWidth = ((_a = this.imageRef.current) === null || _a === void 0 ? void 0 : _a.naturalWidth) || ((_b = this.videoRef.current) === null || _b === void 0 ? void 0 : _b.videoWidth) || 0;
          var naturalHeight = ((_c = this.imageRef.current) === null || _c === void 0 ? void 0 : _c.naturalHeight) || ((_d = this.videoRef.current) === null || _d === void 0 ? void 0 : _d.videoHeight) || 0;
          var mediaAspect = naturalWidth / naturalHeight;
          return mediaAspect < containerAspect ? "horizontal-cover" : "vertical-cover";
        }
        return "horizontal-cover";
      }
      return this.props.objectFit;
    };
    Cropper2.prototype.onPinchStart = function(e) {
      var pointA = Cropper2.getTouchPoint(e.touches[0]);
      var pointB = Cropper2.getTouchPoint(e.touches[1]);
      this.lastPinchDistance = getDistanceBetweenPoints(pointA, pointB);
      this.lastPinchRotation = getRotationBetweenPoints(pointA, pointB);
      this.onDragStart(getCenter(pointA, pointB));
    };
    Cropper2.prototype.onPinchMove = function(e) {
      var _this = this;
      if (!this.currentDoc || !this.currentWindow)
        return;
      var pointA = Cropper2.getTouchPoint(e.touches[0]);
      var pointB = Cropper2.getTouchPoint(e.touches[1]);
      var center = getCenter(pointA, pointB);
      this.onDrag(center);
      if (this.rafPinchTimeout)
        this.currentWindow.cancelAnimationFrame(this.rafPinchTimeout);
      this.rafPinchTimeout = this.currentWindow.requestAnimationFrame(function() {
        var distance = getDistanceBetweenPoints(pointA, pointB);
        var newZoom = _this.props.zoom * (distance / _this.lastPinchDistance);
        _this.setNewZoom(newZoom, center, {
          shouldUpdatePosition: false
        });
        _this.lastPinchDistance = distance;
        var rotation = getRotationBetweenPoints(pointA, pointB);
        var newRotation = _this.props.rotation + (rotation - _this.lastPinchRotation);
        _this.props.onRotationChange && _this.props.onRotationChange(newRotation);
        _this.lastPinchRotation = rotation;
      });
    };
    Cropper2.prototype.render = function() {
      var _this = this;
      var _a = this.props, image = _a.image, video = _a.video, mediaProps = _a.mediaProps, transform = _a.transform, _b = _a.crop, x = _b.x, y = _b.y, rotation = _a.rotation, zoom = _a.zoom, cropShape = _a.cropShape, showGrid = _a.showGrid, _c = _a.style, containerStyle = _c.containerStyle, cropAreaStyle = _c.cropAreaStyle, mediaStyle = _c.mediaStyle, _d = _a.classes, containerClassName = _d.containerClassName, cropAreaClassName = _d.cropAreaClassName, mediaClassName = _d.mediaClassName;
      var objectFit = this.state.mediaObjectFit;
      return React.createElement("div", {
        onMouseDown: this.onMouseDown,
        onTouchStart: this.onTouchStart,
        ref: function ref(el) {
          return _this.containerRef = el;
        },
        "data-testid": "container",
        style: containerStyle,
        className: classNames("reactEasyCrop_Container", containerClassName)
      }, image ? React.createElement("img", __assign({
        alt: "",
        className: classNames("reactEasyCrop_Image", objectFit === "contain" && "reactEasyCrop_Contain", objectFit === "horizontal-cover" && "reactEasyCrop_Cover_Horizontal", objectFit === "vertical-cover" && "reactEasyCrop_Cover_Vertical", mediaClassName)
      }, mediaProps, {
        src: image,
        ref: this.imageRef,
        style: __assign(__assign({}, mediaStyle), {
          transform: transform || "translate(".concat(x, "px, ").concat(y, "px) rotate(").concat(rotation, "deg) scale(").concat(zoom, ")")
        }),
        onLoad: this.onMediaLoad
      })) : video && React.createElement("video", __assign({
        autoPlay: true,
        loop: true,
        muted: true,
        className: classNames("reactEasyCrop_Video", objectFit === "contain" && "reactEasyCrop_Contain", objectFit === "horizontal-cover" && "reactEasyCrop_Cover_Horizontal", objectFit === "vertical-cover" && "reactEasyCrop_Cover_Vertical", mediaClassName)
      }, mediaProps, {
        ref: this.videoRef,
        onLoadedMetadata: this.onMediaLoad,
        style: __assign(__assign({}, mediaStyle), {
          transform: transform || "translate(".concat(x, "px, ").concat(y, "px) rotate(").concat(rotation, "deg) scale(").concat(zoom, ")")
        }),
        controls: false
      }), (Array.isArray(video) ? video : [{
        src: video
      }]).map(function(item) {
        return React.createElement("source", __assign({
          key: item.src
        }, item));
      })), this.state.cropSize && React.createElement("div", {
        style: __assign(__assign({}, cropAreaStyle), {
          width: this.state.cropSize.width,
          height: this.state.cropSize.height
        }),
        "data-testid": "cropper",
        className: classNames("reactEasyCrop_CropArea", cropShape === "round" && "reactEasyCrop_CropAreaRound", showGrid && "reactEasyCrop_CropAreaGrid", cropAreaClassName)
      }));
    };
    Cropper2.defaultProps = {
      zoom: 1,
      rotation: 0,
      aspect: 4 / 3,
      maxZoom: MAX_ZOOM,
      minZoom: MIN_ZOOM,
      cropShape: "rect",
      objectFit: "contain",
      showGrid: true,
      style: {},
      classes: {},
      mediaProps: {},
      zoomSpeed: 1,
      restrictPosition: true,
      zoomWithScroll: true
    };
    Cropper2.getMousePoint = function(e) {
      return {
        x: Number(e.clientX),
        y: Number(e.clientY)
      };
    };
    Cropper2.getTouchPoint = function(touch) {
      return {
        x: Number(touch.clientX),
        y: Number(touch.clientY)
      };
    };
    return Cropper2;
  }(React.Component)
);

// node_modules/antd-img-crop/dist/antd-img-crop.esm.js
var PREFIX = "img-crop";
var ZOOM_INITIAL = 1;
var ZOOM_STEP = 0.1;
var ROTATION_INITIAL = 0;
var ROTATION_MIN = -180;
var ROTATION_MAX = 180;
var ROTATION_STEP = 1;
var ASPECT_MIN = 0.5;
var ASPECT_MAX = 2;
var ASPECT_STEP = 0.01;
var EasyCrop = (0, import_react.forwardRef)((props, ref) => {
  const { cropperRef, zoomSlider, rotationSlider, aspectSlider, showReset, resetBtnText, modalImage, aspect: ASPECT_INITIAL, minZoom, maxZoom, cropShape, showGrid, cropperProps } = props;
  const [zoom, setZoom] = (0, import_react.useState)(ZOOM_INITIAL);
  const [rotation, setRotation] = (0, import_react.useState)(ROTATION_INITIAL);
  const [aspect, setAspect] = (0, import_react.useState)(ASPECT_INITIAL);
  const isResetActive = zoom !== ZOOM_INITIAL || rotation !== ROTATION_INITIAL || aspect !== ASPECT_INITIAL;
  const onReset = () => {
    setZoom(ZOOM_INITIAL);
    setRotation(ROTATION_INITIAL);
    setAspect(ASPECT_INITIAL);
  };
  const [crop, onCropChange] = (0, import_react.useState)({ x: 0, y: 0 });
  const cropPixelsRef = (0, import_react.useRef)({ width: 0, height: 0, x: 0, y: 0 });
  const onCropComplete = (0, import_react.useCallback)((_, croppedAreaPixels) => {
    cropPixelsRef.current = croppedAreaPixels;
  }, []);
  (0, import_react.useImperativeHandle)(ref, () => ({
    rotation,
    cropPixelsRef,
    onReset
  }));
  const wrapperClass = "[display:flex] [align-items:center] [width:60%] [margin-inline:auto]";
  const buttonClass = "[display:flex] [align-items:center] [justify-content:center] [height:32px] [width:32px] [background:transparent] [border:0] [font-family:inherit] [font-size:18px] [cursor:pointer] disabled:[opacity:20%] disabled:[cursor:default]";
  const sliderClass = "[flex:1]";
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)(Cropper, Object.assign({}, cropperProps, {
    ref: cropperRef,
    image: modalImage,
    crop,
    //
    zoom,
    rotation,
    aspect,
    minZoom,
    maxZoom,
    zoomWithScroll: zoomSlider,
    //
    cropShape,
    showGrid,
    onCropChange,
    onZoomChange: setZoom,
    onRotationChange: setRotation,
    onCropComplete,
    classes: {
      containerClassName: `${PREFIX}-container ![position:relative] [width:100%] [height:40vh] [&~section:first-of-type]:[margin-top:16px] [&~section:last-of-type]:[margin-bottom:16px]`,
      mediaClassName: `${PREFIX}-media`
    }
  })), zoomSlider && (0, import_jsx_runtime.jsxs)("section", { className: `${PREFIX}-control ${PREFIX}-control-zoom ${wrapperClass}`, children: [(0, import_jsx_runtime.jsx)("button", { className: buttonClass, onClick: () => setZoom(+(zoom - ZOOM_STEP).toFixed(1)), disabled: zoom - ZOOM_STEP < minZoom, children: "－" }), (0, import_jsx_runtime.jsx)(slider_default, { className: sliderClass, min: minZoom, max: maxZoom, step: ZOOM_STEP, value: zoom, onChange: setZoom }), (0, import_jsx_runtime.jsx)("button", { className: buttonClass, onClick: () => setZoom(+(zoom + ZOOM_STEP).toFixed(1)), disabled: zoom + ZOOM_STEP > maxZoom, children: "＋" })] }), rotationSlider && (0, import_jsx_runtime.jsxs)("section", { className: `${PREFIX}-control ${PREFIX}-control-rotation ${wrapperClass}`, children: [(0, import_jsx_runtime.jsx)("button", { className: `${buttonClass} [font-size:16px]`, onClick: () => setRotation(rotation - ROTATION_STEP), disabled: rotation === ROTATION_MIN, children: "↺" }), (0, import_jsx_runtime.jsx)(slider_default, { className: sliderClass, min: ROTATION_MIN, max: ROTATION_MAX, step: ROTATION_STEP, value: rotation, onChange: setRotation }), (0, import_jsx_runtime.jsx)("button", { className: `${buttonClass} [font-size:16px]`, onClick: () => setRotation(rotation + ROTATION_STEP), disabled: rotation === ROTATION_MAX, children: "↻" })] }), aspectSlider && (0, import_jsx_runtime.jsxs)("section", { className: `${PREFIX}-control ${PREFIX}-control-aspect ${wrapperClass}`, children: [(0, import_jsx_runtime.jsx)("button", { className: buttonClass, onClick: () => setAspect(+(aspect - ASPECT_STEP).toFixed(2)), disabled: aspect - ASPECT_STEP < ASPECT_MIN, children: "↕️" }), (0, import_jsx_runtime.jsx)(slider_default, { className: sliderClass, min: ASPECT_MIN, max: ASPECT_MAX, step: ASPECT_STEP, value: aspect, onChange: setAspect }), (0, import_jsx_runtime.jsx)("button", { className: buttonClass, onClick: () => setAspect(+(aspect + ASPECT_STEP).toFixed(2)), disabled: aspect + ASPECT_STEP > ASPECT_MAX, children: "↔️" })] }), showReset && (zoomSlider || rotationSlider || aspectSlider) && (0, import_jsx_runtime.jsx)(button_default, { className: "[bottom:20px] [position:absolute]", style: isResetActive ? {} : { opacity: 0.3, pointerEvents: "none" }, onClick: onReset, children: resetBtnText })] });
});
var EasyCrop$1 = (0, import_react.memo)(EasyCrop);
function styleInject(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z2 = ".visible{visibility:visible}.grid{display:grid}.\\[align-items\\:center\\]{align-items:center}.\\[background\\:transparent\\]{background:transparent}.\\[border\\:0\\]{border:0}.\\[bottom\\:20px\\]{bottom:20px}.\\[cursor\\:pointer\\]{cursor:pointer}.\\[display\\:flex\\]{display:flex}.\\[flex\\:1\\]{flex:1}.\\[font-family\\:inherit\\]{font-family:inherit}.\\[font-size\\:16px\\]{font-size:16px}.\\[font-size\\:18px\\]{font-size:18px}.\\[height\\:32px\\]{height:32px}.\\[height\\:40vh\\]{height:40vh}.\\[justify-content\\:center\\]{justify-content:center}.\\[margin-inline\\:auto\\]{margin-inline:auto}.\\[position\\:absolute\\]{position:absolute}.\\!\\[position\\:relative\\]{position:relative!important}.\\[width\\:100\\%\\]{width:100%}.\\[width\\:32px\\]{width:32px}.\\[width\\:60\\%\\]{width:60%}.disabled\\:\\[cursor\\:default\\]:disabled{cursor:default}.disabled\\:\\[opacity\\:20\\%\\]:disabled{opacity:20%}.\\[\\&\\~section\\:first-of-type\\]\\:\\[margin-top\\:16px\\]~section:first-of-type{margin-top:16px}.\\[\\&\\~section\\:last-of-type\\]\\:\\[margin-bottom\\:16px\\]~section:last-of-type{margin-bottom:16px}";
styleInject(css_248z2, { "insertAt": "top" });
var openProp = compareVersions(version_default, "4.23.0") === -1 ? "visible" : "open";
var deprecate = (obj, old, now) => {
  if (old in obj) {
    console.error(`\`${old}\` is deprecated, please use \`${now}\` instead`);
    return obj[old];
  }
  return obj[now];
};
var ImgCrop = (0, import_react.forwardRef)((props, cropperRef) => {
  const {
    quality = 0.4,
    fillColor = "white",
    // @ts-ignore
    zoomSlider: ZOOM_SLIDER = true,
    // @ts-ignore
    rotationSlider: ROTATION_SLIDER = false,
    aspectSlider = false,
    showReset = false,
    resetText,
    aspect = 1,
    minZoom = 1,
    maxZoom = 3,
    // @ts-ignore
    cropShape: CROP_SHAPE = "rect",
    // @ts-ignore
    showGrid: SHOW_GRID = false,
    cropperProps,
    modalClassName,
    modalTitle,
    modalWidth,
    modalOk,
    modalCancel,
    onModalOk,
    onModalCancel,
    modalProps,
    beforeCrop,
    children
  } = props;
  const zoomSlider = deprecate(props, "zoom", "zoomSlider") || true;
  const rotationSlider = deprecate(props, "rotate", "rotationSlider") || false;
  const cropShape = deprecate(props, "shape", "cropShape") || "rect";
  const showGrid = deprecate(props, "grid", "showGrid") || false;
  if ("onUploadFail" in props) {
    console.error(`\`onUploadFail\` is removed, because the only way it is called, is when the file is rejected by beforeUpload`);
  }
  deprecate(props, "modalMaskTransitionName", "modalProps.maskTransitionName");
  deprecate(props, "modalTransitionName", "modalProps.transitionName");
  const cb = (0, import_react.useRef)({});
  cb.current.onModalOk = onModalOk;
  cb.current.onModalCancel = onModalCancel;
  cb.current.beforeCrop = beforeCrop;
  const easyCropRef = (0, import_react.useRef)(null);
  const getCropCanvas = (0, import_react.useCallback)((target) => {
    var _a;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const context = ((_a = target === null || target === void 0 ? void 0 : target.getRootNode) === null || _a === void 0 ? void 0 : _a.call(target)) || document;
    const imgSource = context.querySelector(`.${PREFIX}-media`);
    const { width: cropWidth, height: cropHeight, x: cropX, y: cropY } = easyCropRef.current.cropPixelsRef.current;
    if (rotationSlider && easyCropRef.current.rotation !== ROTATION_INITIAL) {
      const { naturalWidth: imgWidth, naturalHeight: imgHeight } = imgSource;
      const angle = easyCropRef.current.rotation * (Math.PI / 180);
      const sine = Math.abs(Math.sin(angle));
      const cosine = Math.abs(Math.cos(angle));
      const squareWidth = imgWidth * cosine + imgHeight * sine;
      const squareHeight = imgHeight * cosine + imgWidth * sine;
      canvas.width = squareWidth;
      canvas.height = squareHeight;
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, squareWidth, squareHeight);
      const squareHalfWidth = squareWidth / 2;
      const squareHalfHeight = squareHeight / 2;
      ctx.translate(squareHalfWidth, squareHalfHeight);
      ctx.rotate(angle);
      ctx.translate(-squareHalfWidth, -squareHalfHeight);
      const imgX = (squareWidth - imgWidth) / 2;
      const imgY = (squareHeight - imgHeight) / 2;
      ctx.drawImage(imgSource, 0, 0, imgWidth, imgHeight, imgX, imgY, imgWidth, imgHeight);
      const imgData = ctx.getImageData(0, 0, squareWidth, squareHeight);
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      ctx.putImageData(imgData, -cropX, -cropY);
    } else {
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, cropWidth, cropHeight);
      ctx.drawImage(imgSource, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    }
    return canvas;
  }, [fillColor, rotationSlider]);
  const [modalImage, setModalImage] = (0, import_react.useState)("");
  const onCancel = (0, import_react.useRef)();
  const onOk = (0, import_react.useRef)();
  const runBeforeUpload = (0, import_react.useCallback)((_a) => __awaiter(void 0, [_a], void 0, function* ({ beforeUpload, file, resolve, reject }) {
    const rawFile = file;
    if (typeof beforeUpload !== "function") {
      resolve(rawFile);
      return;
    }
    try {
      const result = yield beforeUpload(file, [file]);
      if (result === false) {
        resolve(false);
      } else {
        resolve(result !== true && result || rawFile);
      }
    } catch (err) {
      reject(err);
    }
  }), []);
  const getNewBeforeUpload = (0, import_react.useCallback)((beforeUpload) => {
    return (file, fileList) => {
      return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let processedFile = file;
        if (typeof cb.current.beforeCrop === "function") {
          try {
            const result = yield cb.current.beforeCrop(file, fileList);
            if (result === false) {
              return runBeforeUpload({ beforeUpload, file, resolve, reject });
            }
            if (result !== true) {
              processedFile = result || file;
            }
          } catch (err) {
            return runBeforeUpload({ beforeUpload, file, resolve, reject });
          }
        }
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          if (typeof reader.result === "string") {
            setModalImage(reader.result);
          }
        });
        reader.readAsDataURL(processedFile);
        onCancel.current = () => {
          var _a, _b;
          setModalImage("");
          easyCropRef.current.onReset();
          let hasResolveCalled = false;
          (_b = (_a = cb.current).onModalCancel) === null || _b === void 0 ? void 0 : _b.call(_a, (LIST_IGNORE) => {
            resolve(LIST_IGNORE);
            hasResolveCalled = true;
          });
          if (!hasResolveCalled) {
            resolve(upload_default.LIST_IGNORE);
          }
        };
        onOk.current = (event) => __awaiter(void 0, void 0, void 0, function* () {
          setModalImage("");
          easyCropRef.current.onReset();
          const canvas = getCropCanvas(event.target);
          const { type, name, uid } = processedFile;
          canvas.toBlob((blob) => __awaiter(void 0, void 0, void 0, function* () {
            const newFile = new File([blob], name, { type });
            Object.assign(newFile, { uid });
            runBeforeUpload({
              beforeUpload,
              file: newFile,
              resolve: (file2) => {
                var _a, _b;
                resolve(file2);
                (_b = (_a = cb.current).onModalOk) === null || _b === void 0 ? void 0 : _b.call(_a, file2);
              },
              reject: (err) => {
                var _a, _b;
                reject(err);
                (_b = (_a = cb.current).onModalOk) === null || _b === void 0 ? void 0 : _b.call(_a, err);
              }
            });
          }), type, quality);
        });
      }));
    };
  }, [getCropCanvas, quality, runBeforeUpload]);
  const getNewUpload = (0, import_react.useCallback)((children2) => {
    const upload = Array.isArray(children2) ? children2[0] : children2;
    const _a = upload.props, { beforeUpload, accept } = _a, restUploadProps = __rest(_a, ["beforeUpload", "accept"]);
    return Object.assign(Object.assign({}, upload), { props: Object.assign(Object.assign({}, restUploadProps), { accept: accept || "image/*", beforeUpload: getNewBeforeUpload(beforeUpload) }) });
  }, [getNewBeforeUpload]);
  const modalBaseProps = (0, import_react.useMemo)(() => {
    const obj = {};
    if (modalWidth !== void 0)
      obj.width = modalWidth;
    if (modalOk !== void 0)
      obj.okText = modalOk;
    if (modalCancel !== void 0)
      obj.cancelText = modalCancel;
    return obj;
  }, [modalCancel, modalOk, modalWidth]);
  const wrapClassName = `${PREFIX}-modal${modalClassName ? ` ${modalClassName}` : ""}`;
  const lang = typeof window === "undefined" ? "" : window.navigator.language;
  const isCN = lang === "zh-CN";
  const title = modalTitle || (isCN ? "编辑图片" : "Edit image");
  const resetBtnText = resetText || (isCN ? "重置" : "Reset");
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [getNewUpload(children), modalImage && (0, import_jsx_runtime.jsx)(modal_default, Object.assign({}, modalProps, modalBaseProps, { [openProp]: true, title, onCancel: onCancel.current, onOk: onOk.current, wrapClassName, maskClosable: false, destroyOnClose: true, children: (0, import_jsx_runtime.jsx)(EasyCrop$1, { ref: easyCropRef, cropperRef, zoomSlider, rotationSlider, aspectSlider, showReset, resetBtnText, modalImage, aspect, minZoom, maxZoom, cropShape, showGrid, cropperProps }) }))] });
});
export {
  ImgCrop as default
};
/*! Bundled license information:

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

normalize-wheel/src/isEventSupported.js:
  (**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @param {?boolean} capture Check if the capture phase is supported.
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   *)
*/
//# sourceMappingURL=antd-img-crop.js.map

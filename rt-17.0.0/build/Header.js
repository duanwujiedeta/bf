(function (queryString) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * Version tags are loaded from the GitHub API. Since the GitHub API is rate-limited
   * we attempt to save and load the tags in sessionStorage when possible. Since its unlikely
   * that versions will change during a single session this should be safe.
   */
  var TAGS_CACHE_KEY = '@react-dom-fixtures/tags';
  /**
   * Its possible that users will be testing changes frequently
   * in a browser that does not support sessionStorage. If the API does
   * get rate limited this hardcoded fallback will be loaded instead.
   * This way users can still switch between ~some versions while testing.
   * If there's a specific version they need to test that is not here, they
   * can manually load it by editing the URL (`?version={whatever}`)
   */

  var fallbackTags = ['15.4.2', '15.3.2', '15.2.1', '15.1.0', '15.0.2', '0.14.8', '0.13.0'].map(function (version) {
    return {
      name: "v".concat(version)
    };
  });
  var canUseSessionStorage = true;

  try {
    sessionStorage.setItem('foo', '');
  } catch (err) {
    canUseSessionStorage = false;
  }
  /**
   * Attempts to load tags from sessionStorage. In cases where
   * sessionStorage is not available (Safari private browsing) or the
   * tags are cached a fetch request is made to the GitHub API.
   *
   * Returns a promise so that the consuming module can always assume
   * the request is async, even if its loaded from sessionStorage.
   */


  function getVersionTags() {
    return new Promise(function (resolve) {
      var cachedTags;

      if (canUseSessionStorage) {
        cachedTags = sessionStorage.getItem(TAGS_CACHE_KEY);
      }

      if (cachedTags) {
        cachedTags = JSON.parse(cachedTags);
        resolve(cachedTags);
      } else {
        fetch('https://api.github.com/repos/facebook/react/tags?per_page=1000', {
          mode: 'cors'
        }).then(function (res) {
          return res.json();
        }).then(function (tags) {
          // A message property indicates an error was sent from the API
          if (tags.message) {
            return resolve(fallbackTags);
          }

          if (canUseSessionStorage) {
            sessionStorage.setItem(TAGS_CACHE_KEY, JSON.stringify(tags));
          }

          resolve(tags);
        })["catch"](function () {
          return resolve(fallbackTags);
        });
      }
    });
  }

  var React$1 = window.React;

  var VersionPicker = /*#__PURE__*/function (_React$Component) {
    _inherits(VersionPicker, _React$Component);

    var _super = _createSuper(VersionPicker);

    function VersionPicker(props, context) {
      var _this;

      _classCallCheck(this, VersionPicker);

      _this = _super.call(this, props, context);

      _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
        _this.props.onChange(event.target.value);
      });

      var version = props.version || 'local';
      var versions = [version];
      _this.state = {
        versions: versions
      };
      return _this;
    }

    _createClass(VersionPicker, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this2 = this;

        getVersionTags().then(function (tags) {
          var versions = tags.map(function (tag) {
            return tag.name.slice(1);
          });
          versions = ["local"].concat(_toConsumableArray(versions));

          _this2.setState({
            versions: versions
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            version = _this$props.version,
            id = _this$props.id,
            name = _this$props.name;
        var versions = this.state.versions;
        return /*#__PURE__*/React$1.createElement("select", {
          id: id,
          name: name,
          value: version,
          onChange: this.onChange
        }, versions.map(function (version) {
          return /*#__PURE__*/React$1.createElement("option", {
            key: version,
            value: version
          }, version);
        }));
      }
    }]);

    return VersionPicker;
  }(React$1.Component);

  var React = window.React;

  var Header = /*#__PURE__*/function (_React$Component) {
    _inherits(Header, _React$Component);

    var _super = _createSuper(Header);

    function Header(props, context) {
      var _this;

      _classCallCheck(this, Header);

      _this = _super.call(this, props, context);
      var query = queryString.parse(window.location.search);
      var version = query.version || 'local';
      var production = query.production || false;
      var versions = [version];
      _this.state = {
        version: version,
        versions: versions,
        production: production
      };
      return _this;
    }

    _createClass(Header, [{
      key: "handleVersionChange",
      value: function handleVersionChange(version) {
        var query = queryString.parse(window.location.search);
        query.version = version;

        if (query.version === 'local') {
          delete query.version;
        }

        window.location.search = queryString.stringify(query);
      }
    }, {
      key: "handleProductionChange",
      value: function handleProductionChange(event) {
        var query = queryString.parse(window.location.search);
        query.production = event.target.checked;

        if (!query.production) {
          delete query.production;
        }

        window.location.search = queryString.stringify(query);
      }
    }, {
      key: "handleFixtureChange",
      value: function handleFixtureChange(event) {
        window.location.pathname = event.target.value;
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("header", {
          className: "header"
        }, /*#__PURE__*/React.createElement("div", {
          className: "header__inner"
        }, /*#__PURE__*/React.createElement("span", {
          className: "header__logo"
        }, /*#__PURE__*/React.createElement("img", {
          src: process.env.PUBLIC_URL + '/react-logo.svg',
          alt: "React",
          width: "20",
          height: "20"
        }), /*#__PURE__*/React.createElement("a", {
          href: "/"
        }, "DOM Test Fixtures (v", React.version, ")")), /*#__PURE__*/React.createElement("div", {
          className: "header-controls"
        }, /*#__PURE__*/React.createElement("input", {
          id: "react_production",
          className: "header__checkbox",
          type: "checkbox",
          checked: this.state.production,
          onChange: this.handleProductionChange
        }), /*#__PURE__*/React.createElement("label", {
          htmlFor: "react_production",
          className: "header__label"
        }, "Production"), /*#__PURE__*/React.createElement("label", {
          htmlFor: "example"
        }, /*#__PURE__*/React.createElement("span", {
          className: "sr-only"
        }, "Select an example"), /*#__PURE__*/React.createElement("select", {
          value: window.location.pathname,
          onChange: this.handleFixtureChange
        }, /*#__PURE__*/React.createElement("option", {
          value: "/"
        }, "Home"), /*#__PURE__*/React.createElement("option", {
          value: "/hydration"
        }, "Hydration"), /*#__PURE__*/React.createElement("option", {
          value: "/range-inputs"
        }, "Range Inputs"), /*#__PURE__*/React.createElement("option", {
          value: "/text-inputs"
        }, "Text Inputs"), /*#__PURE__*/React.createElement("option", {
          value: "/number-inputs"
        }, "Number Input"), /*#__PURE__*/React.createElement("option", {
          value: "/password-inputs"
        }, "Password Input"), /*#__PURE__*/React.createElement("option", {
          value: "/email-inputs"
        }, "Email Input"), /*#__PURE__*/React.createElement("option", {
          value: "/selects"
        }, "Selects"), /*#__PURE__*/React.createElement("option", {
          value: "/textareas"
        }, "Textareas"), /*#__PURE__*/React.createElement("option", {
          value: "/progress"
        }, "Progress"), /*#__PURE__*/React.createElement("option", {
          value: "/input-change-events"
        }, "Input change events"), /*#__PURE__*/React.createElement("option", {
          value: "/buttons"
        }, "Buttons"), /*#__PURE__*/React.createElement("option", {
          value: "/date-inputs"
        }, "Date Inputs"), /*#__PURE__*/React.createElement("option", {
          value: "/error-handling"
        }, "Error Handling"), /*#__PURE__*/React.createElement("option", {
          value: "/event-pooling"
        }, "Event Pooling"), /*#__PURE__*/React.createElement("option", {
          value: "/custom-elements"
        }, "Custom Elements"), /*#__PURE__*/React.createElement("option", {
          value: "/media-events"
        }, "Media Events"), /*#__PURE__*/React.createElement("option", {
          value: "/pointer-events"
        }, "Pointer Events"), /*#__PURE__*/React.createElement("option", {
          value: "/mouse-events"
        }, "Mouse Events"), /*#__PURE__*/React.createElement("option", {
          value: "/selection-events"
        }, "Selection Events"), /*#__PURE__*/React.createElement("option", {
          value: "/suspense"
        }, "Suspense"), /*#__PURE__*/React.createElement("option", {
          value: "/form-state"
        }, "Form State"))), /*#__PURE__*/React.createElement("label", {
          htmlFor: "global_version"
        }, /*#__PURE__*/React.createElement("span", {
          className: "sr-only"
        }, "Select a version to test"), /*#__PURE__*/React.createElement(VersionPicker, {
          id: "global_version",
          name: "global_version",
          version: this.state.version,
          onChange: this.handleVersionChange
        })))));
      }
    }]);

    return Header;
  }(React.Component);

  return Header;

})(queryString);

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SERVICE_UUID = '0000aadb-0000-1000-8000-00805f9b34fb';
var CHARACTERISTIC_UUID = '0000aadc-0000-1000-8000-00805f9b34fb';
var SYSTEM_SERVICE_UUID = '0000aaaa-0000-1000-8000-00805f9b34fb';
var SYSTEM_READ_UUID = '0000aaab-0000-1000-8000-00805f9b34fb';
var SYSTEM_WRITE_UUID = '0000aaac-0000-1000-8000-00805f9b34fb'; // face indices

var B = 0;
var D = 1;
var L = 2;
var U = 3;
var R = 4;
var F = 5;
var faces = ['B', 'D', 'L', 'U', 'R', 'F']; // color indices

var b = 0;
var y = 1;
var o = 2;
var w = 3;
var r = 4;
var g = 5;
var colors = ['blue', 'yellow', 'orange', 'white', 'red', 'green'];
var turns = {
  0: 1,
  1: 2,
  2: -1,
  8: -2
};
var cornerColors = [[y, r, g], [r, w, g], [w, o, g], [o, y, g], [r, y, b], [w, r, b], [o, w, b], [y, o, b]];
var cornerLocations = [[D, R, F], [R, U, F], [U, L, F], [L, D, F], [R, D, B], [U, R, B], [L, U, B], [D, L, B]];
var edgeLocations = [[F, D], [F, R], [F, U], [F, L], [D, R], [U, R], [U, L], [D, L], [B, D], [B, R], [B, U], [B, L]];
var edgeColors = [[g, y], [g, r], [g, w], [g, o], [y, r], [w, r], [w, o], [y, o], [b, y], [b, r], [b, w], [b, o]];

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.listeners = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(label, callback) {
      if (!this.listeners[label]) {
        this.listeners[label] = [];
      }

      this.listeners[label].push(callback);
    }
  }, {
    key: "off",
    value: function off(label, callback) {
      var listeners = this.listeners[label];

      if (listeners && listeners.length > 0) {
        var index = listeners.indexOf(callback);

        if (index > -1) {
          listeners.splice(index, 1);
          this.listeners[label] = listeners;
          return true;
        }
      }

      return false;
    }
  }, {
    key: "emit",
    value: function emit(label) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = this.listeners[label];

      if (listeners && listeners.length > 0) {
        listeners.forEach(function (listener) {
          listener.apply(void 0, args);
        });
        return true;
      }

      return false;
    }
  }]);

  return EventEmitter;
}();

var Giiker =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Giiker, _EventEmitter);

  function Giiker() {
    var _this;

    _classCallCheck(this, Giiker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Giiker).call(this));
    _this._onCharacteristicValueChanged = _this._onCharacteristicValueChanged.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onDisconnected = _this._onDisconnected.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Giiker, [{
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var device, server, service, characteristic, value;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (window.navigator) {
                  _context.next = 2;
                  break;
                }

                throw new Error('window.navigator is not accesible. Maybe you\'re running Node.js?');

              case 2:
                if (window.navigator.bluetooth) {
                  _context.next = 4;
                  break;
                }

                throw new Error('Web Bluetooth API is not accesible');

              case 4:
                _context.next = 6;
                return window.navigator.bluetooth.requestDevice({
                  filters: [{
                    namePrefix: 'GiC'
                  }],
                  optionalServices: [SERVICE_UUID, SYSTEM_SERVICE_UUID]
                });

              case 6:
                device = _context.sent;
                _context.next = 9;
                return device.gatt.connect();

              case 9:
                server = _context.sent;
                _context.next = 12;
                return server.getPrimaryService(SERVICE_UUID);

              case 12:
                service = _context.sent;
                _context.next = 15;
                return service.getCharacteristic(CHARACTERISTIC_UUID);

              case 15:
                characteristic = _context.sent;
                _context.next = 18;
                return characteristic.startNotifications();

              case 18:
                _context.next = 20;
                return characteristic.readValue();

              case 20:
                value = _context.sent;
                this._state = this._parseCubeValue(value).state;
                characteristic.addEventListener('characteristicvaluechanged', this._onCharacteristicValueChanged);
                _context.next = 25;
                return server.getPrimaryService(SYSTEM_SERVICE_UUID);

              case 25:
                this._systemService = _context.sent;
                device.addEventListener('gattserverdisconnected', this._onDisconnected);
                this._device = device;

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function connect() {
        return _connect.apply(this, arguments);
      };
    }()
    /**
     * Disconnects from the GiiKER cube. Will fire the `disconnected` event once done.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      if (!this._device) {
        return;
      }

      this._device.gatt.disconnect();
    }
  }, {
    key: "_onDisconnected",
    value: function _onDisconnected() {
      this._device = null;
      this.emit('disconnected');
    }
    /**
     * Returns a promise that will resolve to the battery level
     */

  }, {
    key: "getBatteryLevel",
    value: function () {
      var _getBatteryLevel = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var readCharacteristic, writeCharacteristic, data;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._systemService.getCharacteristic(SYSTEM_READ_UUID);

              case 2:
                readCharacteristic = _context2.sent;
                _context2.next = 5;
                return this._systemService.getCharacteristic(SYSTEM_WRITE_UUID);

              case 5:
                writeCharacteristic = _context2.sent;
                _context2.next = 8;
                return readCharacteristic.startNotifications();

              case 8:
                data = new Uint8Array([0xb5]).buffer;
                writeCharacteristic.writeValue(data);
                return _context2.abrupt("return", new Promise(function (resolve) {
                  var listener = function listener(event) {
                    var value = event.target.value;
                    readCharacteristic.removeEventListener('characteristicvaluechanged', listener);
                    readCharacteristic.stopNotifications();
                    resolve(value.getUint8(1));
                  };

                  readCharacteristic.addEventListener('characteristicvaluechanged', listener);
                }));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getBatteryLevel() {
        return _getBatteryLevel.apply(this, arguments);
      };
    }()
    /**
     * Returns the current state of the cube as arrays of corners and edges.
    *
    * Example how to interpret the state:
    *
    * Corner:
    * ```
    *   {
    *     position: ['D', 'R', 'F'],
    *     colors: ['yellow', 'red', 'green']
    *   }
    * ```
    * The corner in position DRF has the colors yellow on D, red on R and green ON F.
    *
    * Edge:
    * ```
    *   {
    *     position: ['F', 'U'],
    *     colors: ['green', 'white']
    *   }
    * ```
    * The edge in position FU has the colors green on F and white on U.
     */

  }, {
    key: "_onCharacteristicValueChanged",
    value: function _onCharacteristicValueChanged(event) {
      var value = event.target.value;

      var _this$_parseCubeValue = this._parseCubeValue(value),
          state = _this$_parseCubeValue.state,
          moves = _this$_parseCubeValue.moves;

      this._state = state;
      this.emit('move', moves[0]);
    }
  }, {
    key: "_parseCubeValue",
    value: function _parseCubeValue(value) {
      var state = {
        cornerPositions: [],
        cornerOrientations: [],
        edgePositions: [],
        edgeOrientations: []
      };
      var moves = [];

      for (var i = 0; i < value.byteLength; i++) {
        var move = value.getUint8(i);
        var highNibble = move >> 4;
        var lowNibble = move & 15;

        if (i < 4) {
          state.cornerPositions.push(highNibble, lowNibble);
        } else if (i < 8) {
          state.cornerOrientations.push(highNibble, lowNibble);
        } else if (i < 14) {
          state.edgePositions.push(highNibble, lowNibble);
        } else if (i < 16) {
          state.edgeOrientations.push(!!(move & 128));
          state.edgeOrientations.push(!!(move & 64));
          state.edgeOrientations.push(!!(move & 32));
          state.edgeOrientations.push(!!(move & 16));

          if (i === 14) {
            state.edgeOrientations.push(!!(move & 8));
            state.edgeOrientations.push(!!(move & 4));
            state.edgeOrientations.push(!!(move & 2));
            state.edgeOrientations.push(!!(move & 1));
          }
        } else {
          moves.push(this._parseMove(highNibble, lowNibble));
        }
      }

      return {
        state: state,
        moves: moves
      };
    }
  }, {
    key: "_parseMove",
    value: function _parseMove(faceIndex, turnIndex) {
      var face = faces[faceIndex - 1];
      var amount = turns[turnIndex - 1];
      var notation = face;

      switch (amount) {
        case 2:
          notation = "".concat(face, "2");
          break;

        case -1:
          notation = "".concat(face, "'");
          break;

        case -2:
          notation = "".concat(face, "2'");
          break;
      }

      return {
        face: face,
        amount: amount,
        notation: notation
      };
    }
  }, {
    key: "_mapCornerColors",
    value: function _mapCornerColors(colors, orientation, position) {
      var actualColors = [];

      if (orientation !== 3) {
        if (position === 0 || position === 2 || position === 5 || position === 7) {
          orientation = 3 - orientation;
        }
      }

      switch (orientation) {
        case 1:
          actualColors[0] = colors[1];
          actualColors[1] = colors[2];
          actualColors[2] = colors[0];
          break;

        case 2:
          actualColors[0] = colors[2];
          actualColors[1] = colors[0];
          actualColors[2] = colors[1];
          break;

        case 3:
          actualColors[0] = colors[0];
          actualColors[1] = colors[1];
          actualColors[2] = colors[2];
          break;
      }

      return actualColors;
    }
  }, {
    key: "_mapEdgeColors",
    value: function _mapEdgeColors(colors, orientation) {
      var actualColors = _toConsumableArray(colors);

      if (orientation) {
        actualColors.reverse();
      }

      return actualColors;
    }
  }, {
    key: "state",
    get: function get() {
      var _this2 = this;

      var state = {
        corners: [],
        edges: []
      };

      this._state.cornerPositions.forEach(function (cp, index) {
        var mappedColors = _this2._mapCornerColors(cornerColors[cp - 1], _this2._state.cornerOrientations[index], index);

        state.corners.push({
          position: cornerLocations[index].map(function (f) {
            return faces[f];
          }),
          colors: mappedColors.map(function (c) {
            return colors[c];
          })
        });
      });

      this._state.edgePositions.forEach(function (ep, index) {
        var mappedColors = _this2._mapEdgeColors(edgeColors[ep - 1], _this2._state.edgeOrientations[index]);

        state.edges.push({
          position: edgeLocations[index].map(function (f) {
            return faces[f];
          }),
          colors: mappedColors.map(function (c) {
            return colors[c];
          })
        });
      });

      return state;
    }
    /**
     * Returns the current state of the cube as a string compatible with cubejs.
    *
    * See https://github.com/ldez/cubejs#cubefromstringstr
     */

  }, {
    key: "stateString",
    get: function get() {
      var cornerFaceIndices = [[29, 15, 26], [9, 8, 20], [6, 38, 18], [44, 27, 24], [17, 35, 51], [2, 11, 45], [36, 0, 47], [33, 42, 53]];
      var edgeFaceIndices = [[25, 28], [23, 12], [19, 7], [21, 41], [32, 16], [5, 10], [3, 37], [30, 43], [52, 34], [48, 14], [46, 1], [50, 39]];
      var colorFaceMapping = {
        blue: 'B',
        yellow: 'D',
        orange: 'L',
        white: 'U',
        red: 'R',
        green: 'F'
      };
      var state = this.state;
      var faces = [];
      state.corners.forEach(function (corner, cornerIndex) {
        corner.position.forEach(function (face, faceIndex) {
          faces[cornerFaceIndices[cornerIndex][faceIndex]] = colorFaceMapping[corner.colors[faceIndex]];
        });
      });
      state.edges.forEach(function (edge, edgeIndex) {
        edge.position.forEach(function (face, faceIndex) {
          faces[edgeFaceIndices[edgeIndex][faceIndex]] = colorFaceMapping[edge.colors[faceIndex]];
        });
      });
      faces[4] = 'U';
      faces[13] = 'R';
      faces[22] = 'F';
      faces[31] = 'D';
      faces[40] = 'L';
      faces[49] = 'B';
      return faces.join('');
    }
  }]);

  return Giiker;
}(EventEmitter);

var connect =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var giiker;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            giiker = new Giiker();
            _context3.next = 3;
            return giiker.connect();

          case 3:
            return _context3.abrupt("return", giiker);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function connect() {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  connect: connect
};
exports.default = _default;

'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Mensagem;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('Mensagem', Mensagem = function () {
                function Mensagem(mensagem) {
                    _classCallCheck(this, Mensagem);

                    this._mensagem = mensagem || '';
                }

                _createClass(Mensagem, [{
                    key: 'mensagem',
                    get: function get() {
                        return this._mensagem;
                    },
                    set: function set(string) {
                        this._mensagem = string;
                    }
                }]);

                return Mensagem;
            }());

            _export('Mensagem', Mensagem);
        }
    };
});
//# sourceMappingURL=Mensagem.js.map
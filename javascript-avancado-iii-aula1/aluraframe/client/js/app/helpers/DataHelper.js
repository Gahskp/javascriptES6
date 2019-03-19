"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, DataHelper;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

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

      _export("DataHelper", DataHelper = function () {
        function DataHelper() {
          _classCallCheck(this, DataHelper);

          throw new Error("Está classe não pode ser instanciada");
        }

        _createClass(DataHelper, null, [{
          key: "textoParaData",
          value: function textoParaData(stringData) {
            if (!/\d{2}\/\d{2}\/\d{4}$/.test(stringData)) {
              throw new Error("Deve estar em formato dd/mm/aaaa");
            }
            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(stringData.split("/").reverse().map(function (item, indice) {
              return item - indice % 2;
            })))))();
          }
        }, {
          key: "dataParaTexto",
          value: function dataParaTexto(data) {
            return data.getDate() + "-" + (data.getMonth() + 1) + "-" + data.getFullYear();
          }
        }]);

        return DataHelper;
      }());

      _export("DataHelper", DataHelper);
    }
  };
});
//# sourceMappingURL=DataHelper.js.map
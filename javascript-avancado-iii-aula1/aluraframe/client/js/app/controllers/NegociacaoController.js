"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._formElement = $("form");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'mensagem');

        this._service = new NegociacaoService();

        this._ordemAtual = '';

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: "_init",
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                console.log(erro);
                _this._mensagem.mensagem = erro;
            });

            setTimeout(function () {
                _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: "_criaNegociacao",
        value: function _criaNegociacao() {
            return new Negociacao(DataHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: "adiciona",
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();
            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.mensagem = mensagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.mensagem = erro;
            });
        }
    }, {
        key: "apaga",
        value: function apaga() {
            var _this3 = this;

            this._service.apaga().then(function (mensagem) {
                _this3._mensagem.mensagem = mensagem;
                _this3._listaNegociacoes.esvazia();
            }).catch(function (erro) {
                return _this3._mensagem.mensagem = erro;
            });
        }
    }, {
        key: "_limpaFormulario",
        value: function _limpaFormulario() {
            this._formElement.reset();
            this._inputData.focus();
            this._inputData.select();
        }
    }, {
        key: "importaNegociacoes",
        value: function importaNegociacoes() {
            var _this4 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this4._listaNegociacoes.adiciona(negociacao);
                    _this4._mensagem.mensagem = 'Negociações do período importadas com sucesso';
                });
            }).catch(function (erro) {
                return _this4._mensagem.mensagem = erro;
            });
        }
    }, {
        key: "ordena",
        value: function ordena(coluna) {

            if (this._ordemAtual == coluna) this._listaNegociacoes.inverteOrdem();else this._listaNegociacoes.ordena(function (a, b) {
                return a[coluna] - b[coluna];
            });
            this._ordemAtual = coluna;
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map
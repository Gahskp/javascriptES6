class NegociacaoController {
  constructor () {
    let $ = document.querySelector.bind(document);
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    this._formElement = $("form");

    this._listaNegociacoes = new Bind(
        new ListaNegociacoes(),
        new NegociacoesView($("#negociacoesView")),
        'adiciona', 'esvazia'
    );

    this._mensagem = new Bind(
        new Mensagem(),
        new MensagemView($("#mensagemView")),
        'mensagem'
    );
  }
  _criaNegociacao(){
    return new Negociacao(DataHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value);
  }

  adiciona(event){
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.mensagem = "Negociação adicionada com sucesso!";
    this._limpaFormulario();
  }

  apaga(){
      this._listaNegociacoes.esvazia();
  }

  _limpaFormulario(){
    this._formElement.reset();
    this._inputData.focus();
    this._inputData.select();
  }

  importaNegociacoes(){
      let service = new NegociacaoService();
      let promise = service.obterNegociacaoDaSemana()
      promise
        .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
        .catch(erro => console.log(erro));
  }
}

class NegociacaoController {
  constructor () {
    let $ = document.querySelector.bind(document);
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    this._formElement = $("form");
    this._listaNegociacoes = new ListaNegociacoes();
    this._negociacoesView = new NegociacoesView($("#negociacoesView"));
    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($("#mensagemView"));

    this._negociacoesView.update(this._listaNegociacoes);
  }
  _criaNegociacao(){
    return new Negociacao(DataHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value);
  }

  adiciona(event){
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._negociacoesView.update(this._listaNegociacoes);
    this._mensagem.mensagem = "Negociação adicionada com sucesoo!";
    this._mensagemView.update(this._mensagem);
    this._limpaFormulario();
  }

  _limpaFormulario(){
    this._formElement.reset();
    this._inputData.focus();
    this._inputData.select();
  }
}

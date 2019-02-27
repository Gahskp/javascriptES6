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
        'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
    );

    this._mensagem = new Bind(
        new Mensagem(),
        new MensagemView($("#mensagemView")),
        'mensagem'
    );

    this._ordemAtual = '';
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

  importaNegociacoes() {

      let service = new NegociacaoService();
      service
      .obterNegociacoes()
      .then(negociacoes => {
          negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
          this._mensagem.mensagem = 'Negociações do período importadas com sucesso';
      })
      .catch(error => this._mensagem.mensagem = error);

  }

  ordena(coluna){
      if (this._ordemAtual == coluna) this._listaNegociacoes.inverteOrdem();
      else this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
      this._ordemAtual = coluna;
  }

}

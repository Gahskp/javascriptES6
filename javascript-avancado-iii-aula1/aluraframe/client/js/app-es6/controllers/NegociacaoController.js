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

        this._service = new NegociacaoService();

        this._ordemAtual = '';

        this._init();
    }

    _init(){

        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.mensagem = erro;
            })

        setTimeout(() => {
            this.importaNegociacoes();
        }, 3000)
    }


    _criaNegociacao(){
        return new Negociacao(DataHelper.textoParaData(this._inputData.value),
        parseInt(this._inputQuantidade.value),
        parseFloat(this._inputValor.value));
    }

    adiciona(event){

        event.preventDefault();
        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.mensagem = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.mensagem = erro);
    }

    apaga(){

        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.mensagem = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.mensagem = erro);
    }

    _limpaFormulario(){
        this._formElement.reset();
        this._inputData.focus();
        this._inputData.select();
    }

    importaNegociacoes() {

        this._service
        .importa(this._listaNegociacoes.negociacoes)
        .then(negociacoes => negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.mensagem = 'Negociações do período importadas com sucesso';
        }))
        .catch(erro => this._mensagem.mensagem = erro);
    }

    ordena(coluna){

        if (this._ordemAtual == coluna) this._listaNegociacoes.inverteOrdem();
        else this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        this._ordemAtual = coluna;
    }
}
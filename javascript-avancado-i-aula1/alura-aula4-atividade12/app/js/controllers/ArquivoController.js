class ArquivoController {

    constructor() {
        this._inputDados = document.querySelector('.dados-arquivo');
    }

    envia() {

        let string = (this._inputDados.value).toUpperCase();
        let arquivo;

        if(ArquivoControllerHelper.validaStringArquivo(string)){
          alert("Certo");
          arquivo = new Arquivo(...string.split('/'))
          console.log(arquivo);
        } else {
          alert("Errado");
        }

        this._limpaFormulario();

        console.log(`Nome: ${arquivo.nome}`);
        console.log(`Tamanho: ${arquivo.tamanho}`);
        console.log(`Tipo: ${arquivo.tipo}`);
    }

    _limpaFormulario() {
        this._inputDados.value = '';
        this._inputDados.focus();
    }
}

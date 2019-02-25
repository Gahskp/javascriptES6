class Mensagem {
    constructor(mensagem = "gay"){
        this._mensagem = mensagem;
    }


    get mensagem(){
        return this._mensagem;
    }

    set mensagem(string){
        this._mensagem = string;
    }
}

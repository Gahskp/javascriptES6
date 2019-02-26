class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes(periodo){

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
            .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });

    }

    obterNegociacoesDaSemana(){

        return this._http
            .get("negociacoes/semana")
            .then(negociacoes => negociacoes.map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor)))
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana!");
            });

    }

    obterNegociacoesDaSemanaAnterior(){

        return this._http
            .get("negociacoes/anterior")
            .then(negociacoes => negociacoes.map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor)))
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana passada!");
            });

    }

    obterNegociacoesDaSemanaRetrasada(){

        return this._http
            .get("negociacoes/retrasada")
            .then(negociacoes => negociacoes.map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor)))
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana retrasada!");
            });

    }
}

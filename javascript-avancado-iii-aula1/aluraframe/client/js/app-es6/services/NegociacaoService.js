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

    cadastra(negociacao){

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(() => {
                throw new Error('Não foi possívell adicionar a negociação')
            });
    }

    lista(){

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações');
            })
    }

    apaga(){

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(() => {
                console.log(erro);
                throw new Error ('Não foi possível adicionar as negociações');
            });
    }

    importa(listaAtual){

        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)))
            )
            .catch(error => {
                console.log(error)
                throw new Error('Não foi possível buscar negociações para importar')
            });
    }

}

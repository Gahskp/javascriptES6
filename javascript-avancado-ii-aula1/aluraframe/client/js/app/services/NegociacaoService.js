class NegociacaoService {

    obterNegociacaoDaSemana(){

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "negociacoes/semana");

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                        .map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor)));
                    }
                    else {
                        console.log(xhr.responseText);
                        reject("Não foi possível obter as negociações da semana!");
                    }
                }
            };

            xhr.send();
        });

    }

    obterNegociacaoDaSemanaPassada(){

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "negociacoes/anteriors");

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                        .map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor)));
                    }
                    else {
                        console.log(xhr.responseText);
                        reject("Não foi possível obter as negociações da semana anterior!");
                    }
                }
            };

            xhr.send();
        });

    }

    obterNegociacaoDaSemanaRetrasada(){

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "negociacoes/retrasada");

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                        .map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor)));
                    }
                    else {
                        console.log(xhr.responseText);
                        reject("Não foi possível obter as negociações da semana retrasada!");
                    }
                }
            };

            xhr.send();
        });

    }
}

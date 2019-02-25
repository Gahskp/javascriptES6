class NegociacaoService {

    obterNegociacaoDaSemana(cb){
        console.log('debug');
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/negociacoes/semana");

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status === 200) {
                cb(null, JSON.parse(xhr.responseText)
                    .map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor)));
            } else {
                console.log(xhr.responseText);
                cb("Não foi possível obter as negociações!", null);
            }
        }

        xhr.send();

    }
}

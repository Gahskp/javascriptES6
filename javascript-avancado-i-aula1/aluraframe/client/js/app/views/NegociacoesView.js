class NegociacoesView extends View{

    template(model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody id="myList">
                    ${model.negociacoes.map(n =>
                        `
                            <tr>
                                <td>${DataHelper.dataParaTexto(n.data)}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.volume}</td>
                            </tr>
                        `
                    ).join('')}
                </tbody>

                <tfoot>
                    <tr>
                        <td colspan="3"></td>
                        <td>
                            ${model.negociacoes.reduce((total, num) => total + num.volume, 0.0)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        `
    }
}

class ValidaArquivoHelper {
  constructor() {

  }

  static validaTextoArquivo(texto){
    return /\D+\/\d+\D{2}\/\.\D{3}/.test(texto);
  }
}

class DataHelper {
  constructor(){
    throw new Error("Está classe não pode ser instanciada");
  }

  static textoParaData(stringData){
    if(/^\d{4}-\d{2}-\d{2}$/.test(stringData)){
      return stringData = new Date(...stringData.split("-").map((item, indice) => item - indice % 2));
    }
  }
  static dataParaTexto(data){
    return `${data.getDate()}-${data.getMonth()+1}-${data.getFullYear()}`;
  }
}

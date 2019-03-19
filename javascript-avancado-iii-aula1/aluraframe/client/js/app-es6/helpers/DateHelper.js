export class DateHelper {
  constructor(){
    throw new Error("Está classe não pode ser instanciada");
  }

  static textoParaData(stringData){
    if(!/\d{2}\/\d{2}\/\d{4}$/.test(stringData)){
        throw new Error("Deve estar em formato dd/mm/aaaa");
    }
    return new Date(...stringData.split("/").reverse().map((item, indice) => item - indice % 2));
  }
  static dataParaTexto(data){
    return `${data.getDate()}-${data.getMonth()+1}-${data.getFullYear()}`;
  }
}

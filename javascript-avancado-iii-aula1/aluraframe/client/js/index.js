var campos = [
  document.querySelector("#data"),
  document.querySelector("#quantidade"),
  document.querySelector("#valor")
];

console.log(campos);

var tbody = document.querySelector('table tbody');

document.querySelector(".form").addEventListener('submit', function(event){

  event.preventDefault();

  console.log(campos);

  var tr = document.createElement("tr");

  campos.forEach(function(campo){

    var td = document.createElement("td");
    td.textContent = campo.value;
    tr.appendChild(td);
  });

  var td = document.createElement("td");
  volume = campos[1].value*campos[2].value;
  td.textContent = volume;
  tr.appendChild(td);

  tbody.appendChild(tr);

});

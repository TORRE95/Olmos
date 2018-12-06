function getDeudores(){
    document.getElementById('deudores').innerHTML = "";
    var agente = document.getElementById('buscar').value;
    XHR =  new XMLHttpRequest();
    XHR.open('GET', "https://arquolmos.000webhostapp.com/getReporte.php?agente="+agente);
    XHR.send();
            
    XHR.onreadystatechange = function(){
            if (XHR.readyState == 4 && XHR.status == 200){
            //Se recibe la respuesta y se quita el formato JSON
                res = XHR.responseText;
                deudor = JSON.parse(res);
                for (var i = 0; i < 25; i++) {
					var deudores = "<tr>"+  			
      								"<td>"+deudor[i].nombre+"</td>"+
      								"<td>"+deudor[i].cliente+"</td>"+
      								"<td>"+deudor[i].region+"</td>"+
      								"<td>"+deudor[i].telefono_actual+"</td>"+
      								"<td>"+deudor[i].fecha_acuerdo+"</td>"+
      								"<td>"+deudor[i].fecha_vencimiento+"</td>"+
   	 								"</tr>";
   	 			document.getElementById('deudores').innerHTML += deudores;
				}
   			}
	}
}

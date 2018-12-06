
function getDeudores(){
    document.getElementById('deudores').innerHTML = "";
    XHR =  new XMLHttpRequest();
    XHR.open('GET', "https://arquolmos.000webhostapp.com/getDeudores.php");
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
      								"<td>"+deudor[i].telefono_actual+" <button type='button' class='btn btn-info' data-toggle='modal' data-target='#exampleModal' data-whatever='@mdo' onclick='localStorage.setItem("+'"'+"cliente"+'"'+","+deudor[i].cliente+")'>Editar</button></td>"+
      								"<td>"+deudor[i].fecha_acuerdo+"</td>"+
      								"<td>"+deudor[i].fecha_vencimiento+"</td>"+
      								"<td><button type='button' class='btn btn-info' data-toggle='modal' data-target='.bd-example-modal-lg' onclick='ver("+'"'+deudor[i].cliente+'",'+deudor[i].region+")'>Ver</button></td>"+
   	 								"</tr>";
   	 			document.getElementById('deudores').innerHTML += deudores;
				}
   			}
	}
}

function ver(cliente, area){
	const formatter = new Intl.NumberFormat('en-US', {
  		style: 'currency',
  		currency: 'USD',
  		minimumFractionDigits: 2
	});

	XHR =  new XMLHttpRequest();
    XHR.open('GET', "https://arquolmos.000webhostapp.com/deudor.php?id="+cliente);
    XHR.send();
    
    var currentdate = new Date(); 
	var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();

    XHR.onreadystatechange = function(){
            if (XHR.readyState == 4 && XHR.status == 200){
            //Se recibe la respuesta y se quita el formato JSON
                res = XHR.responseText;
                deudor = JSON.parse(res);
                console.log(deudor);
                document.getElementById('hora_modal').value = datetime;
                document.getElementById('agente_modal').value = localStorage.getItem('agente');
   	 			document.getElementById('nombre_modal').value = deudor[0].nombre;
   	 			document.getElementById('cliente_modal').value = deudor[0].cliente;
   	 			document.getElementById('tel_actual_modal').value = deudor[0].telefono_actual;
   	 			document.getElementById('tel_antiguo_modal').value = deudor[0].telefono_anterior;
   	 			document.getElementById('saldo_modal').value = formatter.format(deudor[0].saldo);
   	 			document.getElementById('fecha_ult_pago_modal').value = deudor[0].fecha_pago;

          localStorage.setItem('cliente', deudor[0].cliente);
   	 			sucursales(area);
				
   			}
	}
}

function sucursales(area){

	var x = document.getElementById("sucursal_modal");

	XHR =  new XMLHttpRequest();
  XHR.open('GET', "https://arquolmos.000webhostapp.com/getSucursales.php?id="+area);
  XHR.send();
            
    XHR.onreadystatechange = function(){
            if (XHR.readyState == 4 && XHR.status == 200){
            //Se recibe la respuesta y se quita el formato JSON
                res = XHR.responseText;
                console.log(res);
                res = res.split(",");
                for (var i = 0; i < res.length; i++) {
                	var option = document.createElement("option");
    				option.text = res[i];
    				x.add(option);
                }
				
   			}
	}
    
}

function guardar(){
  fecha = localStorage.getItem('fecha_pago');
  var currentdate = new Date(); 
  fechaA = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate();
  XHR =  new XMLHttpRequest();
  XHR.open('GET', "https://arquolmos.000webhostapp.com/guardar.php?fechaA="+fechaA+"&fecha="+fecha+"&id="+localStorage.getItem('cliente')+"&agente="+localStorage.getItem('id_agente'));
  XHR.send();
  getDeudores();
}

function guardarTel(){

  var tel = document.getElementById('tel_nuevo').value;
  XHR =  new XMLHttpRequest();
  XHR.open('GET', "https://arquolmos.000webhostapp.com/guardarTel.php?tel="+tel+"&id="+localStorage.getItem('cliente'));
  XHR.send();
  getDeudores();
}
    
	

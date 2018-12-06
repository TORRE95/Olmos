function login(){
    var user  = document.getElementById('inputEmail').value;
    var pass = document.getElementById('inputPassword').value;
    if(user != "" && pass != ""){
        data = 'nombre='+user+'&pass='+pass;
        XHR =  new XMLHttpRequest();
        XHR.open('GET', "https://arquolmos.000webhostapp.com/login.php?"+data);
        //Se envían los datos almacenados
        XHR.send();
            
        XHR.onreadystatechange = function(){
            if (XHR.readyState == 4 && XHR.status == 200){
            //Se recibe la respuesta y se quita el formato JSON
                res = XHR.responseText;
                agente = JSON.parse(res);
                console.log(res)
                if(res != "[]"){
                    if (agente[0].tipo == 0) {
                        localStorage.setItem("agente", agente[0].nombre);
                        localStorage.setItem("id_agente", agente[0].id);
                        window.location.replace("inicio.html");
                    }
                    else{
                        localStorage.setItem("agente", agente[0].nombre);
                        localStorage.setItem("agente", agente[0].nombre);
                        window.location.replace("admin.html");
                    }
                    
                }else{
                    alert("Datos incorrectos");
                }
            }
        }
    }else{
        alert("Por favor ingresa tus datos")
    }
}
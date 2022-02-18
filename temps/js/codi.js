function enviaCiutat() {

    document.getElementById("pantallaDos").style.zIndex = 16;
    document.getElementById("NomCiutat").innerHTML = document.getElementById("ciutat").value;


    let nomCiutat;

    nomCiutat = document.getElementById("ciutat").value;

    //CRIDA PER SABER EL TEMPS ACTUAL, PASSANT-LI EL NOM DE LA CIUTAT (i d'on agafarem la latitud+longitud per la següent crida)
    $.ajax("http://api.openweathermap.org/data/2.5/weather?q=" + nomCiutat + "&appid=a9d745bc957775f6afd85c40ed07fa76&units=metric&lang=ca")
        .done(function (dades) {
            //Codi que s'executarà quan la 1ª crida es contesti amb OK

            let latitud, longitud;
            latitud = dades.coord.lat;
            longitud = dades.coord.lon;

            //CRIDA MÉS COMPLETA (li passem la latitud i la longitud)
            $.ajax("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitud + "&lon=" + longitud + "&appid=a9d745bc957775f6afd85c40ed07fa76&units=metric")

                .done(function (data) {
                    //Codi que s'executarà quan la 2ona crida es contesti amb ok

                    //console.log(data);


                    document.getElementById("diaText").innerHTML = dataCatala(data.current.dt * 1000);

//                    Mostrem per pantalla temperatura actual
                    document.getElementById("temperatura").innerHTML = data.current.temp + "°C";

                    document.getElementById("imatge").src = "img/" + data.current.weather[0].icon + ".png";

                    if (data.current.weather[0].icon == "01d") {
                        document.getElementById("titol").innerHTML = "Sol";
                    }else if (data.current.weather[0].icon == "01n") {
                        document.getElementById("titol").innerHTML = "Lluna";
                    }else if (data.current.weather[0].icon == "02d" || data.current.weather[0].icon == "02n") {
                        document.getElementById("titol").innerHTML = "Sol i Núvol";
                    }else if (data.current.weather[0].icon == "03d" || data.current.weather[0].icon == "03n") {
                        document.getElementById("titol").innerHTML = "Núvol";
                    }else if (data.current.weather[0].icon == "04d" || data.current.weather[0].icon == "04n") {
                        document.getElementById("titol").innerHTML = "Núvols";
                    }else if (data.current.weather[0].icon == "09d" || data.current.weather[0].icon == "09n") {
                        document.getElementById("titol").innerHTML = "Pluja";
                    }else if (data.current.weather[0].icon == "10d" || data.current.weather[0].icon == "10n") {
                        document.getElementById("titol").innerHTML = "Sol, núvol i pluja ";
                    }else if (data.current.weather[0].icon == "11d" || data.current.weather[0].icon == "11n") {
                        document.getElementById("titol").innerHTML = "Raig";
                    }else if (data.current.weather[0].icon == "13d" || data.current.weather[0].icon == "13n") {
                        document.getElementById("titol").innerHTML = "Neu";
                    }else if (data.current.weather[0].icon == "50d" || data.current.weather[0].icon == "50n") {
                        document.getElementById("titol").innerHTML = "Boira";
                    }
                        
                    

//                    document.getElementById("tempSetmana").innerHTML = "";
                    //Mostrem la temperatura de tota la setmana, dia a dia. La posició 0 de l'arrai és la info d'avui, com que volem de demà en endevant, agafem les posicions  1 a 7, ignorant la posició 0
                    for (let i = 1; i <= 4; i++) {
                        //Convertim la data/hora de format UTF a format que és més fàcil d'entendre (tipus 'Date' de javascript)
                        let dia = new Date(data.daily[i].dt * 1000);

                        let diaSet = "";
                        if (dia.getDay() == 0) {
                            diaSet = "DIUMENGE";
                        } else if (dia.getDay() == 1) {
                            diaSet = "DILLUNS ";
                        } else if (dia.getDay() == 2) {
                            diaSet = "DIMARTS ";
                        } else if (dia.getDay() == 3) {
                            diaSet = "DIMECRES ";
                        } else if (dia.getDay() == 4) {
                            diaSet = "DIJOUS ";
                        } else if (dia.getDay() == 5) {
                            diaSet = "DIVENDRES ";
                        } else if (dia.getDay() == 6) {
                            diaSet = "DISSABTE ";
                        }

                        document.getElementById("diaSetm"+i).innerHTML = diaSet;

                        document.getElementById("min"+i).innerHTML = data.daily[i].temp.min + " °C  Mín";
                        document.getElementById("max"+i).innerHTML = data.daily[i].temp.max + " °C  Màx";
                        
                        document.getElementById("img"+i).src = "img/" + data.daily[i].weather[0].icon + ".png";
                        
                        document.getElementById("click"+i).onclick = function () {
                          mostraDetall(data.daily[i].weather[0].icon, diaSet);  
                        } 
                        
                       
                        
                    }
                });


        })
    //        .fail(function () {
    //            //S'executa quan la crida dóna errors
    //            alert("error");
    //        });
}
//
//
//let mostrada = 0;
//
//let myElement = document.getElementById('pantalla');
//
//// create a simple instance
//// by default, it only adds horizontal recognizers
//let mc = new Hammer(myElement);
setTimeout(function () {
        document.getElementById("pantalla").style.zIndex = 15;
        document.getElementById("musica").pause();
    }, 4000

);

document.getElementById("so").onclick = playPauseAudio;

function playPauseAudio() {
    //    document.getElementById("musica").muted = false;


    if (document.getElementById("musica").paused) {
        document.getElementById("musica").play();
        document.getElementById("so").src = "IMG/audio.png";
    } else {
        document.getElementById("musica").pause();
        document.getElementById("so").src = "IMG/NOAudio.png";
    }
}

function dataCatala(diaText) {

    let resultat;
    let dia = new Date(diaText);

    let diaSet = "";
    if (dia.getDay() == 0) {
        resultat = "Diumenge ";
    } else if (dia.getDay() == 1) {
        resultat = "Dilluns ";
    } else if (dia.getDay() == 2) {
        resultat = "Dimarts ";
    } else if (dia.getDay() == 3) {
        resultat = "Dimecres ";
    } else if (dia.getDay() == 4) {
        resultat = "Dijous ";
    } else if (dia.getDay() == 5) {
        resultat = "Divendres ";
    } else if (dia.getDay() == 6) {
        resultat = "Dissabte ";
    }

    //el dia del mes (numero)
    resultat = resultat + dia.getDate();

    if (dia.getMonth() == 0) {
        resultat += " de GEN. del ";
    } else if (dia.getMonth() == 1) {
        resultat += " de FBR. del ";
    } else if (dia.getMonth() == 2) {
        resultat += " de MARÇ. del ";
    } else if (dia.getMonth() == 3) {
        resultat += " de ABR. del ";
    } else if (dia.getMonth() == 4) {
        resultat += " de MAIG. del ";
    } else if (dia.getMonth() == 5) {
        resultat += " de JUNY. del ";
    } else if (dia.getMonth() == 6) {
        resultat += " de JUL. del ";
    } else if (dia.getMonth() == 7) {
        resultat += " de AG. del ";
    } else if (dia.getMonth() == 8) {
        resultat += " de SET. del ";
    } else if (dia.getMonth() == 9) {
        resultat += " de OCT. del ";
    } else if (dia.getMonth() == 10) {
        resultat += " de NOV. del ";
    } else if (dia.getMonth() == 11) {
        resultat += " de DES. del ";
    }

    resultat += dia.getFullYear();

    return resultat;
}


function mostraDetall(icona, dia){
    
    if( icona=="01d"){
        document.getElementById("pantallaSol").style.zIndex = 20;
        document.getElementById("DDiaSol").innerHTML = dia;
        
    }else if( icona=="02d"){
        document.getElementById("SoliNuvol").style.zIndex = 20;
        document.getElementById("DDiaSoliNuvol").innerHTML = dia;
        
    }else if( icona=="03d"){
        document.getElementById("nuvol").style.zIndex = 20;
        document.getElementById("DDiaSol").innerHTML = dia;
        
    }else if( icona=="04d"){
        document.getElementById("pantallaNuvols").style.zIndex = 20;
        document.getElementById("DDiaNuvols").innerHTML = dia;
        
    }else if( icona=="09d"){
        document.getElementById("pluja").style.zIndex = 20;
        document.getElementById("DDiaPluja").innerHTML = dia;
        
    }else if( icona=="10d"){
        document.getElementById("PantallaSnp").style.zIndex = 20;
        document.getElementById("DDiaPantallaSnp").innerHTML = dia;
        
    }else if( icona=="11d"){
        document.getElementById("raig").style.zIndex = 20;
        document.getElementById("DDiaRaig").innerHTML = dia;
        
    }else if( icona=="13d"){
        document.getElementById("neu").style.zIndex = 20;
        document.getElementById("DDiaNeu").innerHTML = dia;
        
    }else if( icona=="50d"){
        document.getElementById("boira").style.zIndex = 20;
        document.getElementById("DDiaBoira").innerHTML = dia;
        
    }
    
    
}

function tancaSol() {
        document.getElementById("pantallaSol").style.zIndex = 8;
    
}function tancaSoliNuvol() {
        document.getElementById("SoliNuvol").style.zIndex = 8;
    
}function tancaNuvol() {
        document.getElementById("nuvol").style.zIndex = 8;
    
}function tancaNuvols() {
        document.getElementById("pantallaNuvols").style.zIndex = 8;
    
}function tancapluja() {
        document.getElementById("pluja").style.zIndex = 8;
    
}function tancaSnp() {
        document.getElementById("PantallaSnp").style.zIndex = 8;
    
}function tancaRaig() {
        document.getElementById("raig").style.zIndex = 8;
    
}function tancaNeu() {
        document.getElementById("neu").style.zIndex = 8;
    
}function tancaBoira() {
        document.getElementById("boira").style.zIndex = 8;
    
}

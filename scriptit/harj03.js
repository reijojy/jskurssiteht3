// Käännä:
// tsc -t ES2016 --lib "ES2016","DOM" ./harj03.ts
var tuotteet_g = '{ "tuotteet": [{"koodi":"GP-100", "name":"pilputin",' +
    ' "ostohinta":18.00, "myyntihinta":25.15, "site":"https://www.ilves.com/", ' +
    '"toimittaja":"Ilves"},' +
    '{"koodi":"GP-105", "name":"Paseamolaaja",' +
    ' "ostohinta":11.22, "myyntihinta":15.30, "site":"https://www.ilves.com/", ' +
    '"toimittaja":"Ilves"},' +
    '{"koodi":"X0339", "name":"Härpäke",' +
    '"ostohinta":100.00, "myyntihinta":125.00, "site":"http://luonnonmukaiset.fi/", ' +
    '"toimittaja":"Luonnonmukaiset"},' +
    '{"koodi":"X0400", "name":"Jekjustin",' +
    '"ostohinta":100.00, "myyntihinta":200.00, "site":"http://luonnonmukaiset.fi/", ' +
    '"toimittaja":"Luonnonmukaiset"},' +
    '{"koodi":"SH001", "name":"Sahtisammio",' +
    '"ostohinta":117.00, "myyntihinta":213.00, "site":"https://ikaalinen.fi/", ' +
    '"toimittaja":"Sakarin Sahti & Pamaus"},' +
    '{"koodi":"SH002", "name":"Sahtivierre 2L",' +
    '"ostohinta":8.32, "myyntihinta":14.50, "site":"https://ikaalinen.fi/", ' +
    '"toimittaja":"Sakarin Sahti & Pamaus"},' +
    '{"koodi":"SH003", "name":"Sahtivierre 5L",' +
    '"ostohinta":14.32, "myyntihinta":22.80, "site":"https://ikaalinen.fi/", ' +
    '"toimittaja":"Sakarin Sahti & Pamaus"}' +
    ']}';
//var myJSON = '{"firstname":"Nancy", "lastname":"Davolio", "age":31, "city":"New York"}'
function printTuotteet() {
    const piilota = "Piilota tuotteet";
    const tulosta = "Tulosta tuotteet";
    let contacts = new Map();
    if (document.getElementById("b01").innerText == tulosta) {
        document.getElementById("tuotteet").innerHTML = haeTuotteet();
        document.getElementById("b01").innerText = piilota;
    }
    else {
        document.getElementById("tuotteet").innerText = "";
        document.getElementById("b01").innerText = tulosta;
    }
}
function haeTuotteet() {
    var tuoteObj = JSON.parse(tuotteet_g);
    let x = "<table class=\"table-bordered table-hover table-striped\"><tr>";
    x += "<th>Koodi</th><th>Tuotteen nimi</th>";
    x += "<th>Ostohinta</th><th>Myyntihinta</th><th>Kate-%</th>";
    // x += "<th>Ostohinta</th><th>Kate-%</th>";
    tuoteObj.tuotteet.forEach(element => {
        let oh = element.ostohinta;
        let mh = element.myyntihinta;
        let kate = (oh, mh) => { return (1 - (oh / mh)) * 100; };
        x += "<tr><td>" + element.koodi + "</td>";
        x += "<td>" + element.name + "</td>";
        x += "<td align=\"right\">" + oh.toFixed(2) + "</td>";
        x += "<td align=\"right\">" + mh.toFixed(2) + "</td>";
        x += "<td align=\"right\">" + kate(oh, mh).toFixed(2) + "</td>";
        x += "</tr>";
    });
    x += "</table>";
    return x;
}
function printLinkit() {
    const piilota = "Piilota linkit";
    const tulosta = "Tulosta linkit";
    if (document.getElementById("b02").innerText == tulosta) {
        document.getElementById("linkit").innerHTML = haeLinkit();
        document.getElementById("b02").innerText = piilota;
    }
    else {
        document.getElementById("linkit").innerText = "";
        document.getElementById("b02").innerText = tulosta;
    }
}
function haeLinkit() {
    var linkkiObj = JSON.parse(tuotteet_g);
    let mapToimittajat = new Map();
    linkkiObj.tuotteet.forEach(element => {
        if (!mapToimittajat.has(element.toimittaja)) {
            mapToimittajat.set(element.toimittaja, element.site);
            console.log("Tuleeko mappiin dataa");
        }
    });
    // Ja sitten iteroidaan map  
    let x = "<table class=\"table-bordered table-hover table-striped\"><tr>";
    x += "<th>Toimittaja</th><th>Site</th>";
    for (let [key, value] of mapToimittajat) {
        x += "<tr><td>" + key + "</td>";
        x += "<td><a href=\"" + value + "\"target=\"_blank\">" +
            value + "</a></td></tr>";
    }
    x += "</table>";
    return x;
}

class Billete {
    constructor(v, c) {
        this.valor = v;
        this.cantidad = c;
        this.imagen = new Image();
        this.imagen.src = imagenes[numLetras(v)];
        this.cargaOK = false;
    }
}

function saldoCaja(caja) {
    saldo = 0;
    for (var s of caja) {
        saldo += s.valor * s.cantidad;
    }
    return saldo;
}

function numLetras(v) {
    var valor = "";

    switch (v) {
        case 5:
            valor = "cinco"; break;
        case 10:
            valor = "diez"; break;
        case 20:
            valor = "veinte"; break;
        case 50:
            valor = "cincuenta"; break;
        case 100:
            valor = "cien";
    }
    return valor;
}

function entregarDinero() {
    var t = document.getElementById("dinero");
    dinero = parseInt(t.value);
    if (dinero % 5 != 0) {
        resultado.innerHTML = "Debe retirar multiplos de 5 pesos";
        return false;
    }
    if (dinero > 600) {
        resultado.innerHTML = "El monto maximo de retiro es de 600 pesos";
        return false;
    }
    resultado.innerHTML = "";
    if (dinero <= saldo) {
        saldo -= dinero;
        for (var bi of caja) {
            if (dinero > 0) {
                div = Math.floor(dinero / bi.valor);
                if (div > bi.cantidad) {
                    papeles = bi.cantidad;
                }
                else {
                    papeles = div;
                }
                if (papeles > 0)
                    resultado.innerHTML += "Se entregaron " + papeles + " Billetes de: " + bi.valor + "<br>";
                bi.cantidad -= papeles;
                //entregado.push( new Billete(bi.valor, papeles));
                dinero = dinero - (bi.valor * papeles);
            }
        }
    }

    else {
        resultado.innerHTML = "El cajero posee fondos insuficientes solamente tiene: " + saldo + "<br>";
    }
}

var caja = [];
var imagenes = [];

imagenes["cinco"] = "cinco.jpg";
imagenes["diez"] = "diez.jpg";
imagenes["veinte"] = "veinte.jpg";
imagenes["cincuenta"] = "cincuenta.jpg";
imagenes["cien"] = "cien.jpg";

caja.push(new Billete(100, 20));
caja.push(new Billete(50, 15));
caja.push(new Billete(20, 20));
caja.push(new Billete(10, 20));
caja.push(new Billete(5, 100));

var saldo = saldoCaja(caja);
console.log(saldo);

var dinero = 0;
var div = 0;
var papeles = 0;
var resultado = document.getElementById("resultado");
var b = document.getElementById("extraer");
b.addEventListener("click", entregarDinero);
var billete;
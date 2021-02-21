let c = document.getElementById("canvas"); //ulozim canvas do promenne c
let kruh = c.getContext("2d"); //getContext = diky teto funkci mohu do canvasu vykreslovat 2d objekty


let mapa = [[0, 1, 1, 1, 1], //pole podle ktereho se vytvari cesta postupu bludistem 0=cesta postupu, volno 1=prekazka 2=cil bludiste, ulozim ho do promenne mapa
            [0, 0, 0, 0, 1],
            [0, 1, 1, 2, 1]];

let promennaBox = [];

function vykreslitMapu(m){  //funkce ktera vytvori herni pole z pole(array) mapa

    for(i=0; i<m.length; i++){
        promennaBox.push([]); //metoda push pridava na konec pole novy predmet a vrati novou delku pole
        for(j=0; j<m[i].length; j++){
            if(m[i][j] === 1){ //vykresleni prekazek = cerne z pole(array) hodnota 1
                kruh.beginPath(); //zahaji se cesta, nebo se resetuje momentalni cesta
                kruh.fillStyle = "blue"; //nastaveni barvy
                kruh.fillRect(j*20, i*20, 20, 20); //vykresli vyplneny ctverec
            }
            else if(m[i][j] === 2){ //vykresleni vyhravaci pozice = zelena z pole(array) hodnota 2
                kruh.beginPath(); //zahaji se cesta, nebo se resetuje momentalne cesta
                kruh.fillStyle = "#80FF00"; //nastaveni barvy
                kruh.fillRect(j*20, i*20, 20, 20); //vykresli vyplneny ctverec
            }
            promennaBox[i].push({x: j*20, y: i*20, status: m[i][j] === 1 ? 1 : (m[i][j] === 2 ? 2 : 0)}); //na konec pole promennaBox pridam novou hodnotu a vratim zpet jeho novou delku

        }

    }

    
}

function vykreslitHrace(x, y){ //funkce vykresli ctverec
        kruh.beginPath();  //zahaji se cesta, nebo se resetuje momentalne cesta
        kruh.fillStyle = "#FF0000"; //nastaveni barvy
        kruh.fillRect(x, y, 20, 20); //vykresli vyplneny ctverec
}

function pohyb(x,y){
    kruh.clearRect(0, 0, 100, 60); //vymaze konkretni pixely ktere byly kruhu prideleny
    vykreslitHrace(x, y);
    vykreslitMapu(mapa);

    hrac.x = hrac.noveX;
    hrac.y = hrac.noveY;

}

let hrac = { //vlastnosti bludistaka
    x: 0,
    y: 0,
    noveX: 0,
    noveY: 0
}

function overeniBludistaka(){ //kontrola pozice bludistaka 
    for(i=0; i<3; i++){
        for(j=0; j<5; j++){
            let b = promennaBox[i][j];

            if(hrac.noveX === b.x && hrac.noveY === b.y){  //naraz do prekazky
                if(b.status === 1){
                    console.log("zed")
                    alert("dotkl jsi se prekazky!"); //vyhodi alert 
                    location.reload(); //reloadne stranku(diky tomu se bludistak vrati po kolizi s prekazkou na startovni pozici kvuli nacteni prislusne funkce)
                    
                    
                }
                else if(b.status === 2){ //naraz do vyhravaciho policka
                    console.log("vyhra") //do konzole vypise patricne udaje
                    alert("vyhra!"); //vyhodi alert 
                    pohyb(hrac.noveX, hrac.noveY);

                }
                else{
                    pohyb(hrac.noveX, hrac.noveY);

                }

            }
            else if(hrac.noveX < 0 || hrac.noveX > 80 && hrac.noveY < 0 || hrac.noveY > 40){ //naraz do ohraniceni canvasu
                console.log("hranice"); //do konzole vypise hodnota ktera je v logu
            }

        }
    }
}
//keycode.info zjistim ktera klavesa co znamena
window.onkeydown = function(e){ 
    if(e.keyCode == 37){ hrac.noveX = hrac.x - 20; hrac.noveY = hrac.y; } //37 - sipka doleva
    if(e.keyCode == 38){ hrac.noveY = hrac.y - 20; hrac.noveX = hrac.x; } //38 - sipka nahoru
    if(e.keyCode == 39){ hrac.noveX = hrac.x + 20; hrac.noveY = hrac.y; } //39 - sipka doprava
    if(e.keyCode == 40){ hrac.noveY = hrac.y + 20; hrac.noveX = hrac.x; } //40 - sipka dolu
    overeniBludistaka(); //funkce pro overeni pozice bludistaka, kde se nachazi

}

    //s nactenim stranky se spusti funkce, ktera spousti dalsi dve prislusne funkce
    window.onload = function(){
        vykreslitMapu(mapa);
        vykreslitHrace(0, 0);
        
}
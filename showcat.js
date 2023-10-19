function iniciar(document) {

    TocaMiau()


    this.imgtag = document.querySelector(".imgbt")
    this.areaImgRot = document.querySelector("#areaImgRot")

    addEventListener("concluido", trocarImagemTag, true )

    iniciarAnimacao()
    
}

function TocaMiau() {
   
    var i=Math.floor(Math.random()*7)+1    
    var audio = new Audio(`snd/m0${i}.wav`);
    audio.play();
}

async function iniciarAnimacao() {      
    
    acessarApiTheCat()
    
    const minEfeito = [
        { transform: "rotate(360deg)" },
    ];
    
    this.animaImg = this.areaImgRot.animate(minEfeito, {
        
        duration: 1000,
        iterations: Infinity,
        fill: "forwards",
        direction: "alternate"
    })
            
}


async function acessarApiTheCat() {

    setTimeout( function() {
        const dados = fetch('https://api.thecatapi.com/v1/images/search')
        .then( resposta => resposta.json())
        .then( resposta => {                
            let eventofinal = new 
            CustomEvent("concluido", {
                detail: resposta
            })
            dispatchEvent(eventofinal)            
        })
        .catch( error => miauFalhou(error) )
    },3000)

}

function miauFalhou(error) {
    this.imgtag.src = "img/catsad.jpeg"
    this.animaImg.cancel()
    console.log(error)

}


function trocarImagemTag( respostaAPI ) {
 
    console.log("Nova imagem carregada!")
    this.imgtag.src =  respostaAPI.detail[0].url
    this.areaImgRot.width = respostaAPI.detail[0].width
    this.areaImgRot.height = respostaAPI.detail[0].height
    this.animaImg.cancel()
    
    return respostaAPI    
}
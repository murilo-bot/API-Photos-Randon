let localizacao = {lat:53.350140, long:-6.266155}
let apiKey = "c8e16fea6e8bc1fb1cd19018f2d8ace4"
let textInput = "pessoas"
let safe = 1
let index = 0
const imagem = document.getElementById('imagem')
const botaoAvancar = document.getElementById('botaoProximaFoto')
const botaoAnterior = document.getElementById('botaoAnteriorFoto')
const figura = document.getElementById('figura')
const input = document.getElementById('input')
const botaoPesquisa = document.getElementById('botaoPesquisa')
const span = document.getElementById('span')
const spanDiv = document.getElementById('divSpan')

function geolocation(){

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {           
            localizacao.lat = position.coords.latitude
            localizacao.long = position.coords.longitude
        
        });

    }
    
}
geolocation()

let userInput = "pessoas"



async function requisicao(userInput){
    let urlServer = "https://shrouded-mountain-15003.herokuapp.com/"
    let url = `https://flickr.com/services/rest/?api_key=${apiKey}&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=${safe}&per_page=5&lat=${localizacao.lat}&lon=${localizacao.long}&text=${userInput}`
    let res = await fetch (urlServer + url,{
        method:"GET",        
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    })
    res = await res.json()
    constructImageURL(res)    
}
requisicao(userInput)

function pesquisaInput(){
    let texto = input.value
    if(texto !== ""){
        requisicao(texto)
    }
}
botaoPesquisa.addEventListener("click", pesquisaInput)


function constructImageURL (photoObj) {
    let imageUrl = photoObj.photos.photo[index];
    let imageRotativa = photoObj.photos.photo    
    let tamanhoArray = photoObj.photos.photo.length-1
    let link = "https://farm" + imageRotativa[index].farm +
    ".staticflickr.com/" + imageRotativa[index].server +
    "/" + imageRotativa[index].id + "_" + imageRotativa[index].secret + ".jpg"
    imagem.src = link
    figura.appendChild(imagem)    


    function mudaFotoProxima(){
        span.innerHTML = ""
       if(index === tamanhoArray){
           index = 0
        }else{
            index++
        }
    link = "https://farm" + imageRotativa[index].farm +
    ".staticflickr.com/" + imageRotativa[index].server +
    "/" + imageRotativa[index].id + "_" + imageRotativa[index].secret + ".jpg"
    imagem.src = link
    figura.appendChild(imagem)
    span.innerHTML =  imageRotativa[index].title
    spanDiv.appendChild(span)  
    
    }

    function mudaFotoAnterior(){
        if(index === 0){
            index = tamanhoArray
         }else{
            index--
        }
    link ="https://farm" + imageRotativa[index].farm +
    ".staticflickr.com/" + imageRotativa[index].server +
    "/" + imageRotativa[index].id + "_" + imageRotativa[index].secret + ".jpg"
    imagem.src = link
    figura.appendChild(imagem)
    span.innerHTML =  imageRotativa[index].title
    spanDiv.appendChild(span)    
}
    
     
botaoAvancar.addEventListener("click", mudaFotoProxima)
botaoAnterior.addEventListener("click", mudaFotoAnterior)
}


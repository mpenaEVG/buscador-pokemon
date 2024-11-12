 async function buscarPokemon() {

   const pokemonInput = document.getElementById('pokemon-input')
   const datosPokemon = document.getElementById('pokemon-data')
   const listaColeccion = document.getElementById('collection-list')

  try{
    
    let respuesta = await fetch('https://pokeapi.co/api/v2/pokemon')
    let pokeapi = await respuesta.json()
    let fugitivo = pokemonInput.value.toLowerCase()
    let pokemon = pokeapi.results.find(dato => dato.name.toLowerCase() === fugitivo )
    
    if(!pokemon){
      datosPokemon.innerHTML = `<p style= "color:red;">Pokemon ${fugitivo} no encontrado`
    }
    try{

      let segundaRespuesta = await fetch(pokemon.url)
      let datos = await segundaRespuesta.json()
      const {base_experience, height, weight} = datos
      const urlFront= datos.sprites.front_default
      const urlBack = datos.sprites.back_default
      const grito = datos.cries.legacy

      datosPokemon.innerHTML= `
            <h3>${pokemon.name.toUpperCase()}</h3>

            <img src="${urlFront}" style="width:200px; height: 200px">
            <img src="${urlBack}" style="width:200px; height: 200px">
            <p><strong>Experiencia base:</strong> ${base_experience}</p>
            <p><strong>Altura:</strong> ${height} cm</p>
            <p><strong>Peso:</strong> ${weight} kg</p>
            <button id="play" style= "width:100px; height:50px; background-color:yellow; border:1px solid yellow; border-radius:5px;">Sonido</button>
             <audio id="audio">
                <source src="${grito}" type="audio/mpeg">
                Tu navegador no soporta el elemento de audio.
              </audio>`
        
      const audio = document.getElementById('audio')
      const sonido = document.getElementById('play')
      sonido.addEventListener('click', () =>{
          audio.play()
      })

    }catch(error){
      console.log(error)
    }
    

  }catch (error){
    
    console.log(error)

  }
}

function buscarSinAsync(){
   const pokemonInput = document.getElementById('pokemon-input')
   const datosPokemon = document.getElementById('pokemon-data')
   const listaColeccion = document.getElementById('collection-list')
   let fugitivo = pokemonInput.value.toLowerCase()


    fetch('https://pokeapi.co/api/v2/pokemon')

      .then((respuesta) => respuesta.json())
      .then((pokeapi) => {
          let pokemon = pokeapi.results.find(dato => dato.name.toLowerCase() === fugitivo )
           console.log(pokemon) 
      })
      
    
}

 async function buscarPokemon() {

   const pokemonInput = document.getElementById('pokemon-input')
   const datosPokemon = document.getElementById('pokemon-data')

  try{
    
    let respuesta = await fetch('https://pokeapi.co/api/v2/pokemon')
    let pokeapi = await respuesta.json()
    let fugitivo = pokemonInput.value.toLowerCase()
    let pokemon = pokeapi.results.find(dato => dato.name.toLowerCase() === fugitivo )
    
    if(!pokemon){
      datosPokemon.innerHTML = `<p style= "color:red;">Pokemon ${fugitivo} no encontrado</p>`
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
            <button id="play" style= "width:100px; height:50px; display:block; margin:3% 37%; background-color:yellow; border:1px solid yellow; border-radius:5px;">Sonido</button>
             <audio id="audio">
                <source src="${grito}" type="audio/mpeg">
                Tu navegador no soporta el elemento de audio.
              </audio>

            <button id="guardar" style="width:200px; height:50px; border:1px solid #00f7ff; background-color: #00f7ff; border-radius:5px;">Agregar a la colección</button>`

        
      const audio = document.getElementById('audio')
      const sonido = document.getElementById('play')
      sonido.addEventListener('click', () =>{
          audio.play()
      })

      const guardar = document.getElementById('guardar')
      guardar.addEventListener('click', () => {
        let pokemons = JSON.parse(sessionStorage.getItem('pokemons')) || [];

        const bicho = {
          imagen: urlFront,
          nombre: pokemon.name.toUpperCase(),
          llanto: grito
        }
      await addPokemon(bicho)

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
   let fugitivo = pokemonInput.value.toLowerCase()


    fetch('https://pokeapi.co/api/v2/pokemon')

      .then((respuesta) => respuesta.json())
      .then((pokeapi) => {
          let pokemon = pokeapi.results.find(dato => dato.name.toLowerCase() === fugitivo )
          
        if(!pokemon){
          datosPokemon.innerHTML = `<p style= "color:red;">Pokemon ${fugitivo} no encontrado</p>`
          return
        }

        return fetch(pokemon.url)

          .then((segundaRespuesta) => segundaRespuesta.json())
          .then((datos) => {
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
          })
      })

      .catch(error => {
        console.log(error)
      })
}


function buscarConJquery() {
  const pokemonInput = $('#pokemon-input')
  const datosPokemon = $('#pokemon-data')
  const fugitivo = pokemonInput.val().toLowerCase()

  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=1000',
    method: 'GET',
    success: function (pokeapi) {
      const pokemon = pokeapi.results.find(function (dato) {
        return dato.name.toLowerCase() === fugitivo;
      })

      if (!pokemon) {
        datosPokemon.html(`<p style="color:red;">Pokemon ${fugitivo} no encontrado</p>`);
        return; 
      }

      $.ajax({
        url: pokemon.url,
        method: 'GET',
        success: function (datos) {
          const { base_experience, height, weight } = datos;
          const urlFront = datos.sprites.front_shiny;
          const urlBack = datos.sprites.back_shiny;
          const grito = datos.cries.legacy;

          datosPokemon.html(`
            <h3>${pokemon.name.toUpperCase()}</h3>
            <img src="${urlFront}" style="width: 200px; height:200px;">
            <img src="${urlBack}" style="width: 200px; height:200px;">
            <p><strong>Experiencia base:</strong> ${base_experience}</p>
            <p><strong>Altura:</strong> ${height} cm</p>
            <p><strong>Peso:</strong> ${weight} kg</p>
            <button id="play" style="width: 100px; height:50px; background-color:yellow; border:1px solid yellow; border-radius:5px;">Sonido</button>
            <audio id="audio">
              <source src="${grito}" type="audio/mpeg">
              Tu navegador no soporta el elemento de audio.
            </audio>
          `);

          // Reproducir sonido al hacer clic en el botón
          $('#play').click(function () {
            $('#audio')[0].play(); // [0] convierte el objeto jQuery a un elemento DOM
          });
        },
        error: function (error) {
          console.error('Error al obtener detalles del Pokémon:', error);
        },
      });
    },
    error: function (error) {
      console.error('Error al obtener la lista de Pokémon:', error);
    },
  });
}



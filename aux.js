async function verColeccion() {

  const contenedor = document.getElementById('collection-list')
  
  let pokemons = JSON.parse(sessionStorage.getItem('pokemons')) || []
  contenedor.style.display = 'flex'
  contenedor.style.flexDirection = 'row'
  contenedor.style.flexWrap = 'wrap'
  contenedor.innerHTML = ''
  if(pokemons.length === 0){
    contenedor.innerHTML = '<p style="color:red;">Tu colección está vacía</p>'
  }else{

  
      pokemons.forEach(pokemon => {

          let name = document.createElement('h3')
          name.textContent = pokemon.nombre
          name.style.color = 'white'

          let imagen = document.createElement('img')
          imagen.src = pokemon.imagen
          imagen.alt = `Imagen de ${pokemon.nombre.toLowerCase()}`

          let llanto = document.createElement('audio')
          llanto.src = pokemon.llanto
          
          let boton = document.createElement('button')
          boton.textContent = 'sonido'
          boton.style.width = '100px'
          boton.style.height = '50px'
          boton.style.margin = '20px 0'
          boton.style.backgroundColor = 'yellow'
          boton.style.border = '1px solid yellow'
          boton.style.borderRadius = '15px'
          
         boton.addEventListener('click', () =>{
          llanto.play()
        })

          let borrar = document.createElement('button')
          borrar.textContent = 'borrar'
          borrar.style.width = '100px'
          borrar.style.height = '50px'
          borrar.style.margin = '20px 0'
          borrar.style.backgroundColor = 'red'
          borrar.style.border = '1px solid red'
          borrar.style.borderRadius = '15px'
          
         borrar.addEventListener('click', async () => {
            let pokemons = JSON.parse(sessionStorage.getItem('pokemons')) || []

            // Filtra los Pokémon para excluir el que se quiere borrar
            pokemons = pokemons.filter(p => p.nombre !== pokemon.nombre)

            // Actualiza sessionStorage con la nueva lista
            sessionStorage.setItem('pokemons', JSON.stringify(pokemons))

            // Actualiza la vista de la colección
            await verColeccion()
          })
        let pokemonCard = document.createElement('div')
        pokemonCard.style.display = 'flex'
        pokemonCard.style.flexDirection = 'column'
        pokemonCard.style.alignItems = 'center'
        pokemonCard.style.width = '300px'
        pokemonCard.style.margin = '20px'
        pokemonCard.style.padding = '10px'
        pokemonCard.style.border = '1px solid #ccc'

        // Agregar los elementos al contenedor del Pokémon
        pokemonCard.appendChild(name)
        pokemonCard.appendChild(imagen)
        pokemonCard.appendChild(llanto)
        pokemonCard.appendChild(boton)
        pokemonCard.appendChild(borrar)

        contenedor.append(pokemonCard)
      })
  }
}

async function addPokemon(pokemon){
  let pokemons = JSON.parse(sessionStorage.getItem('pokemons')) || []
  const contenedor = document.getElementById('collection-list')
  let contador = false
  pokemons.forEach(element => {

    if(element.nombre === pokemon.nombre)
      contador = true
    })
    if(!contador){
      pokemons.push(pokemon)
    }else{
      alert("Esta repetido")
    }
  sessionStorage.setItem('pokemons',JSON.stringify(pokemons))
  await verColeccion()
}

 async function buscarPokemon() {

   const pokemonInput = document.getElementById('pokemon-input')
   const datosPokemon = document.getElementById('pokemon-data')

  try{
    
    let respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
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
      guardar.addEventListener('click', async() => {
        let pokemons = JSON.parse(sessionStorage.getItem('pokemons')) || []

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

async function autor() {
    
   const usuario = 'mpenaEVG'
   const url = `https://api.github.com/users/${usuario}`
   const divInfo = document.getElementById('gitInfo')

  if(divInfo.style.display != 'none'){
    divInfo.style.display = 'none'
  }else{
    divInfo.style.display = 'flex'
  }

  try{
     let respuesta = await fetch(url)
     let datos = await respuesta.json()

     divInfo.innerHTML=`
                <img src="${datos.avatar_url}">
                <a href="${datos.html_url}"><h3>${datos.login}</h3></a>`
  }catch(error){

    console.error(error)
    divInfo.innerHTML = '<p style="color:red">Error al cargar los datos</p>'
  }   
}

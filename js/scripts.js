const characterList = document.getElementById('charactersList');
const searchCharactersByName = document.getElementById('searchCharactersByName');

const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');

const infoPage = document.getElementById('infoPage');
const infoCharacter = document.getElementById('infoCharacter');
const infoLocations = document.getElementById('infoLocations');
const infoEpisodes = document.getElementById('infoEpisodes');


let currentPage = 1
let totalPages = 0;
let isLoading = false;

async function loadCharacters(name = '', page) {


    try {
        isLoading = true;

        const params = {
            name,
            page
        }

        const response = await api.get('/character', { params })
        console.log(response.data)
        totalPages = response.data.info.pages

        prevPage.disabled = true;
        nextPage.disabled = true;

        // Localizações:

        const responseLocation = await api.get('/location');
        console.log(responseLocation.data)


        // Episodios:

        const responseEpisode = await api.get('/episode')
        console.log(responseEpisode.data)


        characterList.innerHTML = ``

        response.data.results.forEach((character, index) => {
            const characterDivBoot = document.createElement('div');
            characterDivBoot.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'card-group');

            const characterCard = document.createElement('div');
            characterCard.classList.add('card', 'bg-dark', 'ml-3', 'mr-3', 'border-success', 'mb-4', 'card-style');


            characterCard.innerHTML = `
              <div data-bs-toggle="modal" data-bs-target="#meuModal-${index}" data-character='${JSON.stringify(character)}'>
                <img src="${character.image}" class = "card-img-top p-2 rounded img-rounded"/>
                
                <div class="p-2 card-body">
                  

                    <h5 class="card-title text-light font-weight-bold mb-1 fs-3"> ${character.name}</h5>
                
                                    
                   <div class="card-status mb-2">
                                  <div class='${character.status == "Dead"
                    ? "dead"
                    : character.status == "Alive"
                        ? "alive"
                        : "unknown"}'>
                        </div>
                    <p class="card-text text-light fw-semibold">
                            
                    ${character.status == "Dead"
                    ? "Morto"
                    : character.status == "Alive"
                        ? "Vivo"
                        : "Desconhecido"}&nbsp - &nbsp
                        ${character.species == "Human" ? "Humano" : character.species}</p>
                    </div>
                    
                    <small class="text-white-50 font-weight-bold"
                          >Última localização conhecida</small>
                    <p class="mb-0 pb-0 text-light mb-2">${character.location.name}</p>
 


                         

                </div>


                <!--modal-->
                <div class="modal" id="meuModal-${index}">
                        <div class="modal-dialog ">
                        <div class="modal-content bg-dark">
                            <div class="modal-header justify-content-center">
                            <img src="${character.image}" class = "img-fluid animated-image rounded img-rounded"/>
                          
                            </div>
                            <div class="modal-body">
                            <div class="">
                            <h5 class="card-title text-light font-weight-bold mb-3 fs-3"> ${character.name}</h5>
                                <small class="text-white-50 font-weight-bold"
                                >Status</small>
                                <p class="card-text text-light fw-semibold"> ${character.status == "Dead"
                    ? "Morto"
                    : character.status == "Alive"
                        ? "Vivo"
                        : "Desconhecido"}
                                </p>
                                <small class="text-white-50 font-weight-bold"
                                    >Raça</small>
                                <p class="mb-0 pb-0 text-light mb-1">${character.species == "Human" ? "Humano" : character.species}</p>
                                </p>

                            </div>
                            </div>
                            <div class="modal-footer">
                                 <button class="btn btn-secondary " data-bs-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                        </div>
              </div>
   
            `;



            characterDivBoot.appendChild(characterCard)
            characterList.appendChild(characterDivBoot)



            infoPage.innerHTML = `<p class="text-success "> Página:  <span class="text-light">${currentPage}/${totalPages}</span> </p>`
            infoCharacter.innerHTML = `<p class="text-success"> Personagens: <span class="text-light">${response.data.info.count}<span> </p>`
            infoLocations.innerHTML = `<p class="text-success"> Localizações: <span class="text-light"> ${responseLocation.data.info.count}</span> </p>`
            infoEpisodes.innerHTML = `<p class="text-success"> Episódios: <span class="text-light"> ${responseEpisode.data.info.count}</span> </p>`



            prevPage.disabled = !response.data.info.prev
            nextPage.disabled = !response.data.info.next

        })



    } catch (e) {
        console.log(`Erro ao buscar personagens ${e}`);
    } finally {
        isLoading = false;
    }
}

loadCharacters()

searchCharactersByName.addEventListener('input', () => {
    currentPage = 1
    loadCharacters(searchCharactersByName.value, currentPage)

    prevPage.disabled = !response.data.info.prev
    nextPage.disabled = !response.data.info.next


});

prevPage.addEventListener('click', () => {

    if (currentPage > 1 && !isLoading) {
        currentPage--
        loadCharacters(searchCharactersByName.value, currentPage)
    }
});

nextPage.addEventListener('click', () => {
    if (currentPage < totalPages && !isLoading) {
        currentPage++
        loadCharacters(searchCharactersByName.value, currentPage)


    }
});
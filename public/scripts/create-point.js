
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}
populateUFs();

function getCities(event){
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value;
    const indexOfSelectState =  event.target.options.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectState].text  ;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
   
    citySelect.innerHTML = "<option value=>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then(cities => { 
       
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false;
    })
}

document
        .querySelector("select[name=uf]")
        .addEventListener("change",  getCities)

 //Ítems de coleta
 //pegar todos lé

 const itemsToCollect = document.querySelectorAll(".items-grid li")

 for(const item of itemsToCollect){
     item.addEventListener("click",handleSelectedItem)
 }

 
 const collectedItems = document.querySelector("input[name=items]")

 let selectedItems = [];

 function handleSelectedItem(event){
     const itemLi = event.target;

     //add or remove how javascript
     itemLi.classList.toggle("selected");
     
    const itemId = event.target.dataset.id;  

    //verificar se existem items selecionados, se sim
    //pegar os items selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId;
        return itemFound;
   })

    //Se já estiver na seleção, tirar da seleção
   if(alreadySelected >=0 ){
    //tirar da seleção
    const filteredItems = selectedItems.filter(item => {
        const itemIsDifferent = item != itemId;
        return itemIsDifferent
    });

    selectedItems = filteredItems;
   }
   else{
       //Senão estiver selecionado, adicionar à seleção
       selectedItems.push(itemId);
   }

   console.log(selectedItems);
    
//atualizar o campo escondido com os items selecionados
collectedItems.value = selectedItems;
    
 }
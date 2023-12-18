
import axios from "axios";

import Notiflix from 'notiflix';

const catInfo=document.querySelector(".cat-info");

const fetchCatList=document.querySelector(".breed-select");


function fetchBreeds() {
  
    return fetch("https://api.thecatapi.com/v1/breeds").then(
    (response) => {
       if (!response.ok) {
        throw new Error(response.status);
         
      }
      
      return response.json();
    }
  );
  }

  function fetchCatByBreed(breedId)
  {
    let url=`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  
    axios.get(url)
      .then((response)=> {
     
         catInfo.insertAdjacentHTML("beforeend",`<div class="wrapper"><p class="plug"></p></wrapper>`);
          if(!document.querySelector(".error.is-hidden"))
          {
            errorMessage.classList.toggle("is-hidden"); 
          }
        setTimeout(()=>{
      catInfo.innerHTML=`<ul class="cats-list"><li><img src=${[...response.data][0].url} width="400" alt=${[...response.data][0].name}></li>
      <li><h1 class="breed-name">${[...response.data][0].breeds[0].name}</h1><p class="breed-description">${[...response.data][0].breeds[0].description}</p><p class="breed-temperament"><span>Temperament:</span>${[...response.data][0].breeds[0].temperament}</p></li></ul>`;
     fetchCatList.classList.toggle("is-hidden");
     
           
    },2000);
    })
      .catch((error)=> {
        // handle error
        console.log(error);

        Notiflix.Report.failure('Error', 'Oops! Something went wrong! Try reloading the page!', 'Try Again', function retry() {
          fetchCatByBreed(breedId);
        },);  
      })
      .finally(()=> {
        // always executed
        
      })
  }
  
export {fetchBreeds,fetchCatByBreed,axios,catInfo,fetchCatList}


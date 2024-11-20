let input = document.querySelector("input");
let main = document.querySelector("main");
let SearchPage = 1;
let loadPage = 1;

input.addEventListener("keyup" , () =>{
    let value = input.value.toLowerCase();
let valueArr = value.split(" ");
let concat = ""
valueArr.forEach((element, index) =>{
   if (index == 0){
    concat += element;
   }else{
    concat += '+' + element;
   }
})

console.log(concat);
   update(concat ,SearchPage);
   if (main.childNodes.length > 0){
    main.childNodes.forEach((value) =>{
        console.log(value);
        value.remove();
    }) 
   }

// let movieBox = document.querySelectorAll(".movie-box");

// movieBox.forEach((value) =>{
//     value.remove();
// })
});


function debounce(fn , delay){
    let timer ;
    return function (args){
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
             fn(args,SearchPage);
        }, delay);
    }
}

let update = debounce(fetchData , 2000);



async function fetchData(args,SearchPage) {
    let promise = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=d2b7467483aa6b94f36b4781fdb059c7&query=${args}&page=${SearchPage}`);
    let response = await promise.json();
    // console.log(response)
    if (response){
         SearchDisplayOnUI(response.results);
        console.log(response.results);
    }else{
         let p = document.createElement("p");
         p.classList.add('error')
         p.innerText = 'Error : Movies Not Found!'
         main.appendChild(p);
    }
}


function SearchDisplayOnUI(data){

    if (data.length == 0){
       alert("Movies Not Found !!");
       return;
    }

    data.forEach((value) =>{
       // console.log(value.poster_path);
       let movieBox = document.createElement("div");
       movieBox.classList.add("movie-box");
   
       movieBox.innerHTML =`
         <div class="movie-img">
               <img src="https://image.tmdb.org/t/p/w500${value.poster_path}" alt="">
             </div>
             <div class="movie-heading">
               <h2>${value.title}</h2>
               <div class="rating">
                   <p>${value.vote_average}</p>
               </div>
             </div>
             <div class="overview">
               <h1>Overview</h1>
               <p >${value.overview}</p>
               <button class="overview-btn">Know More</button>
             </div>
       `

   
       main.appendChild(movieBox);
    })
   
    let next = document.createElement("button");
        let btnDiv = document.createElement("div");
        btnDiv.classList.add("btn-div");
        next.innerText = "Next Page >>"
        next.classList.add("next-btn");
        btnDiv.appendChild(next);
        main.appendChild(btnDiv);
    
        next.addEventListener("click", () =>{
            btnDiv.style.display = "none";
            // if (main.childNodes.length > 0){
            //     main.childNodes.forEach((value) =>{
            //         console.log(value);
            //         value.remove();
            //     }) 
            //    }

               let movieBox = document.querySelectorAll(".movie-box");

               movieBox.forEach((value) =>{
                   value.remove();
               })
            SearchPage++;
            fetchData(input.value.toLowerCase(),SearchPage);
        })
   }
   




window.onload = () =>{

onLoadData(loadPage);
}



async function onLoadData(loadPage) {
    let promise = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d2b7467483aa6b94f36b4781fdb059c7&&page=${loadPage}`);
    let response = await promise.json();
    // console.log(response)
    if (response){
         displayOnUI(response.results);
        console.log(response.results);
    }else{
         let p = document.createElement("p");
         p.classList.add('error')
         p.innerText = 'Error : Movies Not Found!'
         main.appendChild(p);
    }
}

function displayOnUI(data){
    data.forEach((value) =>{
       // console.log(value.poster_path);
       let movieBox = document.createElement("div");
       movieBox.classList.add("movie-box");
   
       movieBox.innerHTML =`
         <div class="movie-img">
               <img src="https://image.tmdb.org/t/p/w500${value.poster_path}" alt="">
             </div>
             <div class="movie-heading">
               <h2>${value.title}</h2>
               <div class="rating">
                   <p>${value.vote_average}</p>
               </div>
             </div>
             <div class="overview">
               <h1>Overview</h1>
               <p >${value.overview}</p>
               <button class="overview-btn">Know More</button>
             </div>
       `
   
       main.appendChild(movieBox);
    })
   
    let next = document.createElement("button");
        let btnDiv = document.createElement("div");
        btnDiv.classList.add("btn-div");
        next.innerText = "Next Page >>"
        next.classList.add("next-btn");
        btnDiv.appendChild(next);
        main.appendChild(btnDiv);
    
        next.addEventListener("click", () =>{
            btnDiv.style.display = "none";
            // if (main.childNodes.length > 0){
            //     console.log(main.childNodes.length);
                
            //    main.childNodes.forEach((value) =>{
            //        console.log(value);
            //        value.remove();
            //    }) 
            //   }

            let movieBox = document.querySelectorAll(".movie-box");

            movieBox.forEach((value) =>{
                value.remove();
            })
            loadPage++;
            onLoadData(loadPage );
        })
   }







































// function displayOnUI(data){
// //    if (main.childNodes.length > 2){
// //     main.childNodes.forEach((value) =>{
// //         console.log(value);
// //         value.remove();
// //     }) 
// //    }
 
//     data.Search.forEach((value) =>{
//         let div = document.createElement("div");
//         div.classList.add("poster");
//         let img = document.createElement("img");
//         img.src = `${value.Poster}`;
//         div.appendChild(img);
//         main.appendChild(div);
//     });
//     let next = document.createElement("button");
//     let btnDiv = document.createElement("div");
//     btnDiv.classList.add("btn-div");
//     next.innerText = "Next Page >>"
//     next.classList.add("next-btn");
//     btnDiv.appendChild(next);
//     main.appendChild(btnDiv);

//     next.addEventListener("click", () =>{
//         btnDiv.style.display = "none";
//         page++;
//         fetchData(input.value.toLowerCase() ,page );
//     })
// }

// console.log(page)



// async function fetchData(args,page) {
//     // let promise = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=bf51b8ec&s=${args}&page=${page}`);
//     let promise = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=bf51b8ec&s=${args}&page=${page}`);
//     // let promise = await fetch(``)
//     let response = await promise.json();
//     console.log(response);
//    if (response.Response == 'True'){
//     displayOnUI(response);
//    }else{
//    let p = document.createElement("p");
//    p.classList.add('error')
//    p.innerText = 'Error : Movies Not Found!'
//    main.appendChild(p);
//    }
// }
// https://api.themoviedb.org/3/search/movie?query=predators&api_key=d2b7467483aa6b94f36b4781fdb059c7'

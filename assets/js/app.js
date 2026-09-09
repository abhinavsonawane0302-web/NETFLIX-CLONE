
const addMovieBtn = document.getElementById("addMovieBtn")
const movieContainer = document.getElementById("movieContainer")
const movieform = document.getElementById("movieform")
const moviename = document.getElementById("moviename")
const imgurl = document.getElementById("imgurl")
const description = document.getElementById("description")
const rating = document.getElementById("rating")
const Cancel = document.getElementById("Cancel")
const moviemodal = document.getElementById("moviemodal")
const closemodalBtn = document.getElementById("closemodalBtn")
const addmovie = document.getElementById("addmovie")
const Updatebtn = document.getElementById("Updatebtn")
const modaltitle = document.getElementById("modaltitle")



// let moviearr = [

//     {
//         name:"The Fast and the Furious",
//         img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6SuDf_oH4lj9YNW4lmNOvGBIZ5IcQp-oX5sryTJ5xR4s6KTm6bdH3PJ7pPuOXF3WpbWol&s=10",
//         description: "A spate of high-speed robberies in LA brings street racer Dominic Toretto and his crew under the LAPD scanner.FBI agent Brian goes undercover and befriends Toretto in a bid to investigate the matter",
//         rating: "5",
//         id: "1"


//     }

// ]


//  localStorage.setItem("movies",JSON.stringify(moviearr))

function setRating(rating) {
    if (rating > 7) {
        return "badge-success";
    } else if (rating >= 4 && rating <= 7) {
        return "badge-warning";
    } else {
        return "badge-danger";
    }
}



function onToggle() {
    moviemodal.classList.toggle("active")
    
}

let movies = JSON.parse(localStorage.getItem("movies")) || []


function readcard(arr) {
    let result = ``;
    arr.forEach(ele => {
        result += ` 

                    <div class="col-md-3" id="${ele.id}">
                         <div class="card mt-3 movieCard">
                            <div class="card-header d-flex justify-content-between">
                                <h4 class="movieTitle">${ele.name}</h4>
                                <h5><span class="badge ${setRating(ele.rating)}">${ele.rating}</span></h5>
                            </div>
                            <div class="card-body">
                                  <figure class="py-0">
                                       <img src="${ele.img}" alt="${ele.name}" class="card-img">
                                        <figcaption>
                                             <h5>${ele.name}</h5>
                                             <p>${ele.description}</p>
                                        </figcaption>

                                    </figure>
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                  <button onclick="onedit(this)" class="btn btn-sm net-sec-btn" data-edit-id="${ele.id}">Edit</button>
                                  <button onclick="ondelete(this)" class="btn btn-sm net-pri-btn" data-delete-id="${ele.id}">Delete</button>
                             </div>
                        </div>
                    </div>
        
        `


    })

    movieContainer.innerHTML = result;
}

readcard(movies)



function oncreate(ele) {
    ele.preventDefault()

    let movieobj = {

        name: moviename.value,
        img: imgurl.value,
        description: description.value,
        rating: rating.value,
        id: Date.now().toString()

    }

    movies.push(movieobj)
    movieform.reset()



    localStorage.setItem("movies",JSON.stringify(movies))




    let moviecol = document.createElement("div")

    moviecol.classList = "col-md-3"
    moviecol.id = movieobj.id
    moviecol.innerHTML = `

                         <div id="${movieobj.id}">
                         <div class="card mt-3 movieCard">
                            <div class="card-header d-flex justify-content-between">
                                <h4 class="movieTitle">${movieobj.name}</h4>
                                <h5><span class="badge ${setRating(movieobj.rating)}">${movieobj.rating}</span></h5>
                            </div>
                            <div class="card-body">
                                  <figure class="py-0">
                                       <img src="${movieobj.img}" alt="${movieobj.name}" class="card-img">
                                        <figcaption>
                                             <h5>${movieobj.name}</h5>
                                             <p>${movieobj.description}</p>
                                        </figcaption>

                                    </figure>
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                  <button onclick="onedit(this)" class="btn btn-sm net-sec-btn" data-edit-id="${movieobj.id}">Edit</button>
                                  <button onclick="ondelete(this)" class="btn btn-sm net-primary-btn" data-delete-id="${movieobj.id}">Delete</button>
                             </div>
                        </div>
                    </div>
        
    
    
    `
    movieContainer.append(moviecol)

    movieform.reset()

    onToggle()


    Swal.fire({

        title:" Movie Added",
        icon:"success",
        timer:2000

    })
        
    

}


function onedit(ele) {
    let editid = ele.getAttribute("data-edit-id")



    let editobj = movies.find(e => e.id === editid)

    moviename.value = editobj.name
    imgurl.value = editobj.img
    description.value = editobj.description
    rating.value = editobj.rating

    addmovie.classList.add("d-none")
    Updatebtn.classList.remove("d-none")

    Updatebtn.setAttribute("data-edit-id",editid)

    onToggle()


    modaltitle.innerText ="Update Movie"

        
    

}

function onupdate() {
    let updateid = this.getAttribute("data-edit-id")

    

    let getindex = movies.findIndex(u => u.id === updateid)
    



        movies[getindex].name = moviename.value,
        movies[getindex].img = imgurl.value,
        movies[getindex].description = description.value,
        movies[getindex].rating = rating.value,
        

    localStorage.setItem("movies", JSON.stringify(movies));

    

    readcard(movies)

    Updatebtn.classList.add("d-none")
    addmovie.classList.remove("d-none")


    modaltitle.innerText = "Add Movie"

    movieform.reset()

    onToggle()

      Swal.fire({

        title:" Movie Update Successfully",
        icon:"success",
        timer:2000

    })
        
    

}

function ondelete(ele){

    let deleteid = ele.getAttribute("data-delete-id")

    let movieindex = movies.findIndex(d => d.id === deleteid)

    let confirmdelete = confirm(`are you sure you wont to delete movie ?`)

    if(!confirmdelete){
        return;
    }
    movies.splice(movieindex,1)

    localStorage.setItem("movies", JSON.stringify(movies))

    readcard(movies)

    Swal.fire({

       title:" Movie Delete Successfully",
        icon:"success",
        timer:2000

    })

}



movieform.addEventListener("submit", oncreate)
Updatebtn.addEventListener("click", onupdate)



addMovieBtn.addEventListener("click", onToggle)

closemodalBtn.addEventListener("click", onToggle)

Cancel.addEventListener("click", onToggle)

 movieform.reset()









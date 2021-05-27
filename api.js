myBtn = document.getElementsByClassName('myBtn');

function addPreloader() {
    // if the preloader doesn't already exist, add one to the page
    if(!document.querySelector('#preloader')) {
      var preloaderHTML = '<img src="images/ajax-loader.gif" style="min-height: 50px; min-width: 50px; position: fixed; top: 50%; left: 50%" id="preloader">';
      document.querySelector('body').innerHTML += preloaderHTML;
    }
}

function removePreloader() {
    // select the preloader element
    var preloader = document.querySelector('#preloader');
    // if it exists, remove it from the page
    if(preloader) {
      preloader.remove();
    }
}

for(i=0; i<1; i++){
    myBtn[i].addEventListener('click', getData, {once:true});
}

function getData(){
    fetch("https://reqres.in/api/users?page=1").then(
            response=> {
                if(!response.ok){
                    addPreloader();
                    throw Error('ERROR');
                }
                removePreloader();
                return response.json();
            })
            .then(
            data => {
                teamContainer = document.getElementsByClassName('teamContainer')[0];
                for(var i=0; i<data.data.length; i++){
                    div = document.createElement('div');
                    div.classList.add('col-sm-6' ,'col-md-4' ,'col-lg-3', 'mb-4');
                    insideDiv = `
                                <div class="card">
                                    <img src="${data.data[i].avatar}" class="card-img-top img-fluid mb-3">
                                    <div class="card-body">
                                    <div class="card-title"><h4>${data.data[i].first_name} ${data.data[i].last_name}</h4></div>
                                        <div class="card-text mb-3">${data.data[i].email}</div>
                                    </div>
                                </div>
                                `;
                    div.innerHTML = insideDiv;
                    teamContainer.appendChild(div);
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }
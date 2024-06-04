
rotated = false;
beans = document.querySelectorAll(".bean");
list_of_parishes_name = []
data = []
fetch("../data/parish_information.json")
  .then(response => response.json())
  .then(parish_json_info => {
    data.push(parish_json_info['Parishes']);
    
    data[0].forEach(parish => {
      for(let name in parish){
        parish_branch = document.getElementById(`${name.toLowerCase()}-branch`);
        parish_branch.querySelector('.parish-name').innerHTML = `${name}`;
        // parish_branch.style.setProperty('font-family', 'Arial') * TO CHANGE FONT FAMILY

        list_of_locations = parish_branch.querySelector('.locations-list').querySelector('ul');
        parish[name].forEach(location_information =>{
          for(let location_name in location_information){
            if(location_name === name){
              // Add Parish Picture and Description
              return;
            }
            else{
              console.log(location_name)
              console.log(location_information[location_name])
              list_of_locations.insertAdjacentHTML('beforeend', 
              `<li class="place"> 
                <div class="place-heading"> 
                  <p class="name">${location_name}</p>
                  <div class="rating-hightlight rating-overall">${DisplayStarRating(location_information[location_name]['overall-rating'])}</div>
                </div>
                <div class="place-info">
                  <img class="location-image" src="../static/image/Left Arm.png">
                  <div class="review-block">
                    <p class="description">${location_information[location_name]['description']}</p>
                    <div class="ratings">
                      <div class="coffee-rating">
                        <p class="rating">Kofe:</p>
                        <div class="rating-hightlight coffee-rating-overall">${DisplayStarRating(location_information[location_name]['coffee-rating'])}
                        <p>${location_information[location_name]['coffee-rating']}/5</p>
                        </div>
                      </div>
                      <div class="wifi-rating">
                        <p class="rating">Wifi: </p>
                        <div class="rating-hightlight wifi-rating-overall">${DisplayStarRating(location_information[location_name]['wifi-rating'])}
                        <p>${location_information[location_name]['wifi-rating']}/5</p>
                        </div>
                      </div>
                    </div>
                    <div class="overall-rating">
                      <p class="rating">Overall: </p>
                      <div class="rating-hightlight rating-overall">${DisplayStarRating(location_information[location_name]['overall-rating'])}
                      <p>${location_information[location_name]['overall-rating']}/5</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>`
              )
            }
          }
        })
      };
    });
  }
);




function JiggleBean(){
  for (let bean of beans){
    bean.style.transform = 'rotate(-10deg)';
    
    setTimeout(function(){
      bean.style.transform = 'rotate(10deg)'
    }, 600);
  }
}

function HighlightBean(beanID){
  bean = document.getElementById(beanID);
  bean.src="../static/image/Bean-highlight.png";
  bean.classList.add("bean-highlighted");
}
function UnhighlightBean(beanID){
  bean = document.getElementById(beanID);
  bean.src="../static/image/Bean.png";
  bean.classList.remove("bean-highlighted");
}

function HighlightBean2(beanID){
  bean = document.getElementById(beanID);
  bean.src="../static/image/Bean2-highlight.png";
  bean.classList.add("bean-highlighted");
}
function UnhighlightBean2(beanID){
  bean = document.getElementById(beanID);
  bean.src="../static/image/Bean2.png";
  bean.classList.remove("bean-highlighted");
}

function ToggleBranch(location_branch){
  branch = document.getElementById(location_branch)
  if(branch.classList.contains('not-visible')){
    branch.classList.remove('not-visible')
    branch.classList.add('visible')
  }
  else{
    branch.classList.remove('visible')
    branch.classList.add('not-visible')
  }
}

function DisplayStarRating(rating){
  if (rating === 0){
    return `<img class="star star1" src="../static/icons/empty star.png">
    <img class="star star2" src="../static/icons/empty star.png">
    <img class="star star3" src="../static/icons/empty star.png">
    <img class="star star4" src="../static/icons/empty star.png">
    <img class="star star5" src="../static/icons/empty star.png">`
  }
  else if (rating > 0 && rating <= 0.9){
    return  `<img class="star star1" src="../static/icons/half star.png">
    <img class="star star2" src="../static/icons/empty star.png">
    <img class="star star3" src="../static/icons/empty star.png">
    <img class="star star4" src="../static/icons/empty star.png">
    <img class="star star5" src="../static/icons/empty star.png">`
  }
  else if (rating === 1){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/empty star.png">
    <img class="star star3" src="../static/icons/empty star.png">
    <img class="star star4" src="../static/icons/empty star.png">
    <img class="star star5" src="../static/icons/empty star.png">`
  }
  else if (rating > 1 && rating <= 1.9){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/half star.png">
    <img class="star star3" src="../static/icons/empty star.png">
    <img class="star star4" src="../static/icons/empty star.png">
    <img class="star star5" src="../static/icons/empty star.png">`
  }
  else if (rating === 2){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/full star.png">
    <img class="star star3" src="../static/icons/empty star.png">
    <img class="star star4" src="../static/icons/empty star.png">
    <img class="star star5" src="../static/icons/empty star.png">`
  }
  else if (rating > 2 && rating <= 2.9){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/full star.png">
    <img class="star star3" src="../static/icons/half star.png">
    <img class="star star4" src="../static/icons/empty star.png">
    <img class="star star5" src="../static/icons/empty star.png">`
  }
  else if (rating === 3){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/full star.png">
    <img class="star star3" src="../static/icons/full star.png">
    <img class="star star4" src="../static/icons/empty star.png">
    <img class="star star5" src="../static/icons/empty star.png">`
  }
  else if (rating > 3 && rating <= 3.9){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/full star.png">
    <img class="star star3" src="../static/icons/full star.png">
    <img class="star star4" src="../static/icons/half star.png">
    <img class="star star5" src="../static/icons/empty star.png">`
  }
  else if (rating === 4){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/full star.png">
    <img class="star star3" src="../static/icons/full star.png">
    <img class="star star4" src="../static/icons/full star.png">
    <img class="star star5" src="../static/icons/empty star.png">`
  }
  else if (rating > 4 && rating <= 4.9){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/full star.png">
    <img class="star star3" src="../static/icons/full star.png">
    <img class="star star4" src="../static/icons/full star.png">
    <img class="star star5" src="../static/icons/half star.png">`
  }
  else if (rating === 5){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/full star.png">
    <img class="star star3" src="../static/icons/full star.png">
    <img class="star star4" src="../static/icons/full star.png">
    <img class="star star5" src="../static/icons/full star.png">`
  }
}

setInterval(JiggleBean, 1200)
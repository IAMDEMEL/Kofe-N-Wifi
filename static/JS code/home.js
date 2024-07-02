
let rotated = false;
let beans = document.querySelectorAll(".bean");
let list_of_parishes_name = [];
let data = [];
locations = null;

const snakeCase = string => {
  return string.replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');
};

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

fetch("../data/parish_information.json")
  .then(response => response.json())
  .then(parish_json_info => {
    data.push(parish_json_info['Parishes']);
    data[0].forEach(parish => {
      for(let name in parish){
        parish_branch = document.getElementById(`${name.toLowerCase()}-branch`);

        parish[name].forEach(location_information =>{
          for(let location_name in location_information){
            parish_branch.querySelector('.parish-name').innerHTML = name;
            current_branch = parish_branch.querySelector('.list-top');
            list_of_locations = parish_branch.querySelector('.locations-list').querySelector('ul');

            if(location_name === name){
              current_branch.insertAdjacentHTML('afterend', `<div class="parish-information">
                <div class="information">
                  <img class="parish-image" src="${location_information[location_name]['image-location']}">
                  <p class="parish-description">${location_information[location_name]['parish-description']}</p>
                </div>
                <p class="list-heading">Locations</p>
              </div>`)
              return;
            }
            else{
              list_of_locations.insertAdjacentHTML('beforeend', 
              `<li class="place ${snakeCase(location_name)}" onclick="ToggleLocationInformation('${name.toLowerCase()}-branch', '${snakeCase(location_name)}'), RecreateBorder('${name.toLowerCase()}-branch')"> 
                <div class="place-heading clickable"> 
                  <p class="name">${location_name}</p>
                  <div class="rating-hightlight rating-overall">${DisplayStarRating(location_information[location_name]['overall-rating'])}</div>
                </div>
              </li>`
              )
            }
          }
        })
      };
    });
    
    parishes = document.querySelectorAll('.parish-info');
    parishes.forEach(parish =>{
      if(parish.classList.contains('parish-info2')){
        let anchor = parish.querySelector('.coffee-branch').querySelector('.middle');
        anchor.insertAdjacentHTML('beforebegin','<div class="top-border"></div>')
        anchor.insertAdjacentHTML('beforeend','<div class="side-border"></div>')
        anchor.insertAdjacentHTML('afterend','<div class="bottom-border"></div>')
        parish.querySelector('.top-border').style.left = -20 + 'px';
        parish.querySelector('.side-border').style.left = -10 + 'px';
        parish.querySelector('.bottom-border').style.left = -20 + 'px';
        parish.querySelector('.top-border').style.right = 20 + 'px';
        parish.querySelector('.side-border').style.right = 10 + 'px';
        parish.querySelector('.bottom-border').style.right = 20 + 'px';
      }
      else{
        let anchor = parish.querySelector('.coffee-branch').querySelector('.middle');
        anchor.insertAdjacentHTML('beforebegin','<div class="top-border"></div>')
        anchor.insertAdjacentHTML('afterbegin','<div class="side-border"></div>')
        anchor.insertAdjacentHTML('afterend','<div class="bottom-border"></div>')
      }
    });
  }
);


function ToggleLocationInformation(branch_name, name){
  current_location = document.getElementById(branch_name).querySelector(`.${name}`);
  wifi_local = null;
  
  if(name.includes('_')){
    let fillers_found = (name.match(new RegExp("_", "g")) || []).length;
    let temp_name = `${toTitleCase(name.split('_')[0])}`;

    for(let i = 1; i <= fillers_found; i++){
      temp_name += ` ${toTitleCase(name.split('_')[i])}`
    }
    name = temp_name;
  }
  else{
    name = toTitleCase(name)
  }
  
  if(current_location.classList.contains('has-clicked')){
    const removable = current_location.querySelector('.place-info');
    console.log(current_location)
    removable.remove();
    current_location.classList.remove('has-clicked');
  }
  else{
    current_parish =  toTitleCase(branch_name.split("-")[0]);
    if(current_parish.includes('.')){
      current_parish =  toTitleCase(branch_name.split("-")[0]).split(".");
      current_parish = `${current_parish[0]}.${toTitleCase(current_parish[1])}`
    }
    data[0].forEach(parish =>{
      for(let parish_name in parish){
        if(parish_name === current_parish){
          parish[parish_name].forEach(wifi_spot =>{
            for(place_name in wifi_spot){
              if (place_name === name){
                wifi_local = wifi_spot;
              }
            }
          })
        }
      }
    });

    location_name = current_location.querySelector('.name').innerHTML;
    current_location.classList.add('has-clicked')
    current_location.querySelector('.place-heading').insertAdjacentHTML('afterend',`
    <div class="place-info">
    <img class="location-image" src="../static/image/Left Arm.png">
    <div class="review-block">
      <p class="description">${wifi_local[`${name}`]['description']}</p>
      <div class="ratings">
        <div class="coffee-rating">
          <p class="rating">Kofe:</p>
          <div class="rating-hightlight coffee-rating-overall">${DisplayStarRating(wifi_local[name]['coffee-rating'])}
          <p>${wifi_local[name]['coffee-rating']}/5</p>
          </div>
        </div>
        <div class="wifi-rating">
          <p class="rating">Wifi: </p>
          <div class="rating-hightlight wifi-rating-overall">${DisplayStarRating(wifi_local[name]['wifi-rating'])}
          <p>${wifi_local[name]['wifi-rating']}/5</p>
          </div>
        </div>
        </div>
        <div class="overall-rating">
          <p class="rating">Overall: </p>
          <div class="rating-hightlight rating-overall">${DisplayStarRating(wifi_local[name]['overall-rating'])}
          <p>${wifi_local[name]['overall-rating']}/5</p>
          </div>
        </div>
      </div>
    </div>`)
  }
}

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

function RecreateBorder(location_branch){
  current_branch = document.getElementById(`${location_branch}`);
  all_border_icons = current_branch.querySelector('.side-border').querySelectorAll('.border-icon');
  all_border_icons
  .forEach(icon =>{
    icon.remove();
  });
  ToggleBorder(location_branch);
}


function ToggleBorder(location_branch){
  let branch = document.getElementById(location_branch);
  let icon_size = 30;
  let amount_to_add = branch.offsetWidth / icon_size;

  for(let i = 0; i < amount_to_add; i++){
    if(i % 2 == 0){
      branch.querySelector('.top-border').insertAdjacentHTML('beforeend', `<img class="border-beans border-icon" src="../static/icons/beans.png">`);
      branch.querySelector('.bottom-border').insertAdjacentHTML('beforeend', `<img class="border-beans border-icon" src="../static/icons/beans.png">`);
    }
    else{
      let leaves1_or_leaves2 = Math.random();
      branch.querySelector('.top-border').insertAdjacentHTML('beforeend', `<img class="border-leaves border-icon" src="../static/icons/leaves.png">`)
      branch.querySelector('.bottom-border').insertAdjacentHTML('beforeend', `<img class="border-leaves border-icon" src="../static/icons/leaves.png">`)
    }
  }
  if(branch.classList.contains('visible')){
    amount_to_add = branch.querySelector('.middle').offsetHeight / icon_size;
    for(let i = 0; i < amount_to_add; i++){
      if(i % 2 == 0){
        branch.querySelector('.side-border').insertAdjacentHTML('beforeend', `<img class="border-leaves border-icon" src="../static/icons/leaves.png">`)
      }
      else{
        branch.querySelector('.side-border').insertAdjacentHTML('beforeend', `<img class="border-beans border-icon" src="../static/icons/beans.png">`);
      }
    }
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

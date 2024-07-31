let beans = document.querySelectorAll(".bean");
let numbers = ['zero', 'one', 'two', 'three', 'four' , 'five', 'six', 'seven', 'eight', 'nine'];
let data;
const snakeCase = string => {
  return string.replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');
};
function isCharNumber(c) {
  return typeof c === 'string' && c.length === 1 && c >= '0' && c <= '9';
}
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function CreateBorderSetup() {
  let parishes = document.querySelectorAll('.parish-info');
  parishes.forEach(parish => {
        if (parish.classList.contains('parish-info2')) {
          let anchor = parish.querySelector('.coffee-branch').querySelector('.middle');
          anchor.insertAdjacentHTML('beforebegin', '<div class="top-border"></div>')
          anchor.insertAdjacentHTML('beforeend', '<div class="side-border"></div>')
          anchor.insertAdjacentHTML('afterend', '<div class="bottom-border"></div>')
          parish.querySelector('.top-border').style.left = -10 + 'px';
          parish.querySelector('.side-border').style.left = -10 + 'px';
          parish.querySelector('.bottom-border').style.left = -10 + 'px';
          parish.querySelector('.top-border').style.right = 10 + 'px';
          parish.querySelector('.side-border').style.right = 10 + 'px';
          parish.querySelector('.bottom-border').style.right = 10 + 'px';
        } else {
          let anchor = parish.querySelector('.coffee-branch').querySelector('.middle');
          anchor.insertAdjacentHTML('beforebegin', '<div class="top-border"></div>')
          anchor.insertAdjacentHTML('afterbegin', '<div class="side-border"></div>')
          anchor.insertAdjacentHTML('afterend', '<div class="bottom-border"></div>')
        }
      }
  );
}

function StartUp(){
  let parish_information = document.querySelector('.json_parish_data');
  let data_here = JSON.parse(parish_information.innerHTML);
  parish_information.remove();
  data = data_here['Parishes']

  function converting_numbers_to_string_at_start_of_location_names(location_name) {
    let old_location_name = location_name;
    let new_location_name = '';
    let temp = '';
    if (isCharNumber(location_name[0])) {
      new_location_name = location_name.split(' ');
      for (let i = 0; i <= new_location_name[0].length; i++) {
        if (new_location_name[0][i] === '0') {
          temp += numbers[0]
        } else if (new_location_name[0][i] === '1') {
          temp += numbers[1]
        } else if (new_location_name[0][i] === '2') {
          temp += numbers[2]
        } else if (new_location_name[0][i] === '3') {
          temp += numbers[3]
        } else if (new_location_name[0][i] === '4') {
          temp += numbers[4]
        } else if (new_location_name[0][i] === '5') {
          temp += numbers[5]
        } else if (new_location_name[0][i] === '6') {
          temp += numbers[6]
        } else if (new_location_name[0][i] === '7') {
          temp += numbers[7]
        } else if (new_location_name[0][i] === '8') {
          temp += numbers[8]
        } else if (new_location_name[0][i] === '9') {
          temp += numbers[9]
        }
      }
      for (let i = 1; i <= new_location_name.length - 1; i++) {
        if (i < new_location_name[0].length) {
          temp += ` ${new_location_name[i]}`;
        } else {
          temp += ` ${new_location_name[i]}`;
        }
      }
      location_name = temp;
    }
    return {location_name, old_location_name};
  }

  data.forEach(parish => {
    for(let name in parish){
      let parish_branch = document.getElementById(`${name.toLowerCase()}-branch`);
      parish[name].forEach(location_information =>{
        for(let location_name in location_information){
          const __ret = converting_numbers_to_string_at_start_of_location_names(location_name);
          location_name = __ret.location_name;
          let old_location_name = __ret.old_location_name;
          parish_branch.querySelector('.parish-name').innerHTML = name;
          let current_branch = parish_branch.querySelector('.list-top');
          let list_of_locations = parish_branch.querySelector('.locations-list').querySelector('ul');

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
            `<li class="place ${snakeCase(location_name)}" onclick="ToggleLocationInformation('${name.toLowerCase()}-branch', '${snakeCase(location_name)}'), ToggleBorder('${name.toLowerCase()}-branch')">
              <div class="place-heading clickable">
                <p class="name">${old_location_name}</p>
                <div class="rating-highlight rating-overall">${DisplayStarRating(location_information[old_location_name]['overall-rating'])}</div>
              </div>
            </li>`
            )
          }
        }
      })
    };
  });
  CreateBorderSetup();
};


function ToggleLocationInformation(branch_name, name){
  let temp_name = name.split('_')[0].toLowerCase();
  let segments = name.split('_');
  let temp = '';


  let current_location = document.getElementById(branch_name).querySelector(`.${name}`);
  let wifi_local;
  let current_parish;
  
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

  function changing_back_string_to_numbers_to_access_json_list() {
    let old_name = name;
    for (let i = 0; i <= numbers.length - 1; i++) {
      if (temp_name.includes(numbers[i])) {
        if (numbers[i] === 'zero') {
          temp += '0'
        }
        if (numbers[i] === 'one') {
          temp += '1'
        }
        if (numbers[i] === 'two') {
          temp += '2'
        }
        if (numbers[i] === 'three') {
          temp += '3'
        }
        if (numbers[i] === 'four') {
          temp += '4'
        }
        if (numbers[i] === 'five') {
          temp += '5'
        }
        if (numbers[i] === 'six') {
          temp += '6'
        }
        if (numbers[i] === 'seven') {
          temp += '7'
        }
        if (numbers[i] === 'eight') {
          temp += '8'
        }
        if (numbers[i] === 'nine') {
          temp += '9'
        }
      }
    }

    if (temp.length > 0) {
      for (let i = 1; i <= segments.length - 1; i++) {
        temp += ` ${toTitleCase(segments[i])}`;
      }
      old_name = temp;
    }
    return old_name;
  }

  let old_name = changing_back_string_to_numbers_to_access_json_list();

  let location_name;
  if (current_location.classList.contains('has-clicked')) {
    const removable = current_location.querySelector('.place-info');
    removable.remove();
    current_location.classList.remove('has-clicked');
  } else {
    current_parish = toTitleCase(branch_name.split("-")[0]);
    if (current_parish.includes('.')) {
      current_parish = toTitleCase(branch_name.split("-")[0]).split(".");
      current_parish = `${current_parish[0]}.${toTitleCase(current_parish[1])}`
    }
    data.forEach(parish => {
      for (let parish_name in parish) {
        if (parish_name === current_parish) {
          parish[parish_name].forEach(wifi_spot => {
            for (let place_name in wifi_spot) {
              if (place_name === old_name) {
                wifi_local = wifi_spot;
              }
            }
          })
        }
      }
    });
    console.log(wifi_local[old_name])
    location_name = current_location.querySelector('.name').innerHTML;
    current_location.classList.add('has-clicked')
    current_location.querySelector('.place-heading').insertAdjacentHTML('afterend', `
    <div class="place-info">
    <img class="location-image" src=${wifi_local[`${old_name}`]['image-location']}>
    <div class="review-block">
      <p class="description">${wifi_local[`${old_name}`]['description']}</p>
      <div class="ratings">
        <div class="coffee-rating">
          <p class="rating">Kofe:</p>
          <div class="rating-highlight coffee-rating-overall">${DisplayStarRating(wifi_local[old_name]['coffee-rating'])}
          <p>${wifi_local[old_name]['coffee-rating']}/5</p>
          </div>
        </div>
        <div class="wifi-rating">
          <p class="rating">Wifi: </p>
          <div class="rating-highlight wifi-rating-overall">${DisplayStarRating(wifi_local[old_name]['wifi-rating'])}
          <p>${wifi_local[old_name]['wifi-rating']}/5</p>
          </div>
        </div>
        </div>
        <div class="external-url">
          <p class="rating">URL: </p>
          <a class="url-link rating-overall" rel="external" target="_blank" href="${wifi_local[old_name]['url']}">Click Here!</a>
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

function JiggleBorderIcons(){
  let icons = document.querySelectorAll('.border-icon');
  for (let icon of icons){
    icon.style.transform = 'rotate(-10deg)';

    setTimeout(function(){
      icon.style.transform = 'rotate(10deg)'
    }, 500);
  }
}

function HighlightBean(beanID){
  let bean = document.getElementById(beanID);
  bean.src="../static/image/Bean-highlight.png";
  bean.classList.add("bean-highlighted");
}
function UnhighlightBean(beanID){
  let bean = document.getElementById(beanID);
  bean.src="../static/image/Bean.png";
  bean.classList.remove("bean-highlighted");
}

function HighlightBean2(beanID){
  let bean = document.getElementById(beanID);
  bean.src="../static/image/Bean2-highlight.png";
  bean.classList.add("bean-highlighted");
}
function UnhighlightBean2(beanID){
  let bean = document.getElementById(beanID);
  bean.src="../static/image/Bean2.png";
  bean.classList.remove("bean-highlighted");
}

function ToggleBranch(location_branch){
  let branch = document.getElementById(location_branch);
  if(branch.classList.contains('not-visible')){
    branch.classList.remove('not-visible')
    branch.classList.add('visible')
  }
  else{
    branch.classList.remove('visible')
    branch.classList.add('not-visible')
  }
}

function ToggleBorder(location_branch){
  let icon_size = 30;
  let branch = document.getElementById(location_branch);
  let amount_to_add = branch.offsetWidth / icon_size;
  let branch_border = branch.querySelector('.side-border');
  let all_border_icons = branch_border.querySelectorAll('.border-icon');

  all_border_icons
  .forEach(icon =>{
    icon.remove();
  });

  // Adding Border Icons.
  if(branch.querySelector('.top-border').querySelectorAll('.border-icon').length == 0){
    for(let i = 0; i < amount_to_add; i++){
      if(i % 2 == 0){
        branch.querySelector('.top-border').insertAdjacentHTML('beforeend', `<img class="border-beans border-icon" src="../static/icons/mug icon.png">`);
        branch.querySelector('.bottom-border').insertAdjacentHTML('beforeend', `<img class="border-beans border-icon" src="../static/icons/mug icon.png">`);
      }
      else{
        branch.querySelector('.top-border').insertAdjacentHTML('beforeend', `<img class="border-leaves border-icon" src="../static/icons/leaves.png">`)
        branch.querySelector('.bottom-border').insertAdjacentHTML('beforeend', `<img class="border-leaves border-icon" src="../static/icons/leaves.png">`)
      }
    }
  }

  if(branch.classList.contains('visible')){
    amount_to_add = branch.querySelector('.middle').offsetHeight / icon_size;
    for(let i = 0; i < amount_to_add; i++){
      if(i % 2 == 0){
        branch.querySelector('.side-border').insertAdjacentHTML('beforeend', `<img class="border-leaves border-icon" src="../static/icons/leaves.png">`)
      }
      else{
        branch.querySelector('.side-border').insertAdjacentHTML('beforeend', `<img class="border-beans border-icon" src="../static/icons/mug icon.png">`);
      }
    }
  }
  setInterval(JiggleBorderIcons, 1000);
  // Adjusting background beans new fall distance based on new page height due to changing window sizes.
  ToggleBeanFallDistance();
}


function ToggleBeanFallDistance() {
  let rows_of_beans_to_spawn = 3;
  let current_page_height;
  for (let row = 1; row <= rows_of_beans_to_spawn; row++) {
    let all_beans = document.querySelectorAll(`.falling-bean-${row}`);
    current_page_height = document.querySelector('body').offsetHeight;
    all_beans.forEach(bean => {
      let new_page_height = (current_page_height - 71) + 'px';
      bean.style.setProperty('--end_pos', `${new_page_height}`);
    });
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
  else if (rating > 0 && rating <= 0.99){
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
  else if (rating > 1 && rating <= 1.99){
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
  else if (rating > 2 && rating <= 2.99){
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
  else if (rating > 3 && rating <= 3.99){
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
  else if (rating > 4 && rating <= 4.99){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/full star.png">
    <img class="star star3" src="../static/icons/full star.png">
    <img class="star star4" src="../static/icons/full star.png">
    <img class="star star5" src="../static/icons/half star.png">`
  }
  else if (rating === 5 || rating === 5.0){
    return  `<img class="star star1" src="../static/icons/full star.png">
    <img class="star star2" src="../static/icons/full star.png">
    <img class="star star3" src="../static/icons/full star.png">
    <img class="star star4" src="../static/icons/full star.png">
    <img class="star star5" src="../static/icons/full star.png">`
  }
}

StartUp();
setInterval(JiggleBean, 1200);

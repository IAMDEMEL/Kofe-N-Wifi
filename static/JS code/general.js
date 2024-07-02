let current_page = document.querySelector('main');

function Spawn_Background_Beans(){
  const screen_width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let rows_of_beans_to_spawn = 3;
  for(let row = 1; row <= rows_of_beans_to_spawn; row++){
    let background_beans_container = document.querySelector(`.background-beans-${row}`);
    let beans_to_spawn = Math.floor(screen_width / document.querySelector(`.falling-bean-${row}`).offsetWidth);
    
    if(current_page.classList.contains('about') || current_page.classList.contains('contact')){
      if(row >= 2){
        background_beans_container.remove();
        background_beans_container = document.querySelector(`.background-beans-${row + 1}`);
        background_beans_container.remove();
        break;}
    }

    for (i = 1; i < beans_to_spawn; i++){
      let fall_speed = Math.random();
      if(fall_speed < 1/5){
        background_beans_container.insertAdjacentHTML('beforeend', `
          <div class="falling-bean-${row} very-slow">
            <img class="after-trail">
            <img class="bkgd-bean" src="../static/image/Bean.png">
          </div>`
        );
      }
      else if(fall_speed > 1/5 && fall_speed < 2/5){
        background_beans_container.insertAdjacentHTML('beforeend', `
          <div class="falling-bean-${row} slow">
            <img class="after-trail">
            <img class="bkgd-bean" src="../static/image/Bean.png">
          </div>`
        );
      }
      else if(fall_speed > 2/5 && fall_speed < 3/5){
        background_beans_container.insertAdjacentHTML('beforeend', `
          <div class="falling-bean-${row} normal">
            <img class="after-trail">
            <img class="bkgd-bean" src="../static/image/Bean.png">
          </div>`
        );
      }
      else if(fall_speed > 3/5 && fall_speed < 4/5){
        background_beans_container.insertAdjacentHTML('beforeend', `
          <div class="falling-bean-${row} fast">
            <img class="after-trail">
            <img class="bkgd-bean" src="../static/image/Bean.png">
          </div>`
        );
      }
      else{
        background_beans_container.insertAdjacentHTML('beforeend', `
          <div class="falling-bean-${row} very-fast">
            <img class="after-trail">
            <img class="bkgd-bean" src="../static/image/Bean.png">
          </div>`
        );
      }
    }

    let all_beans = document.querySelectorAll(`.falling-bean-${row}`);
    all_beans.forEach(bean => {
      Bean_Tuning(bean);
    });
  };
};


function Bean_Tuning(bean) {
  let filter = 10;
  let opacity = 0;
  while (filter > 7 || filter < 3) {
    filter = Math.random();
    opacity = filter;
    filter =  Math.floor(filter * 10);
  }
  bean.style.opacity = opacity;
  bean.style.animationDelay = (Math.random() * 20) + 's';
  
  if(current_page.classList.contains('home')){
  bean.style.setProperty('--end_pos', '9935px');
  }
  else if(current_page.classList.contains('about')){
    bean.style.setProperty('--end_pos', '630px');

    if (bean.classList.contains('very-slow')){bean.style.setProperty('animation-duration', '7s');}
    else if (bean.classList.contains('slow')){bean.style.setProperty('animation-duration', '6s');}
    else if (bean.classList.contains('normal')){bean.style.setProperty('animation-duration', '5s');}
    else if (bean.classList.contains('fast')){bean.style.setProperty('animation-duration', '4s');}
    else if (bean.classList.contains('very-fast')){bean.style.setProperty('animation-duration', '3s');}
  }
  else if(current_page.classList.contains('contact')){
    bean.style.setProperty('--end_pos', '1000px');

    if (bean.classList.contains('very-slow')){bean.style.setProperty('animation-duration', '9s');}
    else if (bean.classList.contains('slow')){bean.style.setProperty('animation-duration', '8s');}
    else if (bean.classList.contains('normal')){bean.style.setProperty('animation-duration','7s');}
    else if (bean.classList.contains('fast')){bean.style.setProperty('animation-duration', '6s');}
    else if (bean.classList.contains('very-fast')){bean.style.setProperty('animation-duration', '5s');}
  }
}

Spawn_Background_Beans();
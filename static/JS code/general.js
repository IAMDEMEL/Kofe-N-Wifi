let background_beans_container_1 = document.querySelector('.background-beans-1');
const screen_width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let beans_to_spawn = Math.floor(screen_width / document.querySelector('.falling-bean').offsetWidth);



for (i = 1; i < beans_to_spawn; i++){
  let fall_speed = Math.random();
  if(fall_speed < 1/5){
    background_beans_container_1.insertAdjacentHTML('beforeend', `
      <div class="falling-bean very-slow">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 1/5 && fall_speed < 2/5){
    background_beans_container_1.insertAdjacentHTML('beforeend', `
      <div class="falling-bean slow">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 2/5 && fall_speed < 3/5){
    background_beans_container_1.insertAdjacentHTML('beforeend', `
      <div class="falling-bean normal">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 3/5 && fall_speed < 4/5){
    background_beans_container_1.insertAdjacentHTML('beforeend', `
      <div class="falling-bean fast">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else{
    background_beans_container_1.insertAdjacentHTML('beforeend', `
      <div class="falling-bean very-fast">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
}

let background_beans_container_2 = document.querySelector('.background-beans-2');
beans_to_spawn = Math.floor(screen_width / document.querySelector('.falling-bean-2').offsetWidth)
for (i = 1; i < beans_to_spawn; i++){
  let fall_speed = Math.random();
  if(fall_speed < 1/5){
    background_beans_container_2.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-2 very-slow">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 1/5 && fall_speed < 2/5){
    background_beans_container_2.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-2 slow">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 2/5 && fall_speed < 3/5){
    background_beans_container_2.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-2 normal">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 3/5 && fall_speed < 4/5){
    background_beans_container_2.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-2 fast">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else{
    background_beans_container_2.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-2 very-fast">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
}
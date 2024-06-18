let background_beans_container_1 = document.querySelector('.background-beans-1');
const screen_width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let beans_to_spawn = Math.floor(screen_width / document.querySelector('.falling-bean-1').offsetWidth);

// Spawn_Background_Beans(){
//   let rows_of_beans_to_spawn = 3;
//   for(let row = 1; row <= rows_of_beans_to_spawn; row++){
//     let background_beans_container = document.querySelector(`.background-beans-${row}`);
//     let beans_to_spawn = Math.floor(screen_width / document.querySelector(`.falling-bean-${row}`).offsetWidth);
//   };
// };

for (i = 1; i < beans_to_spawn; i++){
  let fall_speed = Math.random();
  if(fall_speed < 1/5){
    background_beans_container_1.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-1 very-slow">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 1/5 && fall_speed < 2/5){
    background_beans_container_1.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-1 slow">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 2/5 && fall_speed < 3/5){
    background_beans_container_1.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-1 normal">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 3/5 && fall_speed < 4/5){
    background_beans_container_1.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-1 fast">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else{
    background_beans_container_1.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-1 very-fast">
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

let background_beans_container_3 = document.querySelector('.background-beans-3');
beans_to_spawn = Math.floor(screen_width / document.querySelector('.falling-bean-3').offsetWidth)
for (i = 1; i < beans_to_spawn; i++){
  let fall_speed = Math.random();
  if(fall_speed < 1/5){
    background_beans_container_3.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-3 very-slow">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 1/5 && fall_speed < 2/5){
    background_beans_container_3.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-3 slow">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 2/5 && fall_speed < 3/5){
    background_beans_container_3.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-3 normal">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else if(fall_speed > 3/5 && fall_speed < 4/5){
    background_beans_container_3.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-3 fast">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }
  else{
    background_beans_container_3.insertAdjacentHTML('beforeend', `
      <div class="falling-bean-3 very-fast">
        <img class="after-trail">
        <img class="bkgd-bean" src="../static/image/Bean.png">
      </div>`
    );
  }

}



all_beans_1 = document.querySelectorAll('.falling-bean-1');
all_beans_1.forEach(bean => {
  Bean_Tuning(bean);
});

all_beans_2 = document.querySelectorAll('.falling-bean-2');
all_beans_2.forEach(bean => {
  Bean_Tuning(bean);
});

all_beans_3 = document.querySelectorAll('.falling-bean-3');
all_beans_3.forEach(bean => {
  Bean_Tuning(bean);
});


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
}

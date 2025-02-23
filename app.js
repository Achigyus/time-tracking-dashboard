let tasksCard = document.getElementById('task_cards');
let mainCardBottomm = document.getElementById('main_card_bottom');
let html = ''
let fetchedData = []
fetch('./data.json').then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        console.log('Network response was not ok. Something went wrong!');
    }
}).then((data) => {
    console.log(data);
    fetchedData = data
    renderData('daily', data);
})

function renderData(timeframe, dataArray) {
    html = '' // reset the html

    // loop through the data array and build the html
    dataArray.forEach((task) => {
        console.log(task.timeframes[timeframe].current)
        let builtHtml = `
            <div class="task_card ${task.title.toLowerCase().replace(' ', '_')}">
            <div class="task_card_top">
              <div class="task_card_top_img_cont">
                <img src="./images/icon-${task.title.toLowerCase().replace(' ', '-')}.svg" alt="work icon" class="task_card_top_img">
              </div>
            </div>
            <div class="task_card_bottom">
              <div class="task_card_bottom_title_dd">
                <p class="task_card_bottom_title fw400">${task.title}</p>
                <div class="task_card_bottom_dd">
                  <img src="./images/icon-ellipsis.svg" alt="drop down icon" class="task_card_bottom_dd_img">
                </div>
              </div>
  
              <div class="task_card_bottom_present_last">
                <p class="task_card_bottom_present fw400">${task.timeframes[timeframe].current}hrs</p>
                <p class="task_card_bottom_last fw400">Last Week - ${task.timeframes[timeframe].previous}hrs</p>
              </div>
            </div>
          </div>
        `
        html += builtHtml // append the built html to the html variable
    })
    mainCardBottomm.classList.remove('daily', 'weekly', 'monthly') // remove all classes from the mainCardBottomm element
    mainCardBottomm.classList.add(timeframe) // add the timeframe class to the mainCardBottomm element
    tasksCard.innerHTML = html // set the innerHTML of the tasksCard element to the html variable
}
function getUrl(){ fetch('https://api.giphy.com/v1/gifs/translate?api_key=LMA8EnMkumv7ExGFQdE9AqnPmQTJK1pj&s=cats',{
    mode: "cors"})
  .then(function(response) {
    return response.json();
  }).then(function(response) {
    img.src = response.data.images.original.url;
  })
  .catch(function(err) {
    console.log("failed");
  });

  const img = document.querySelector('img');

}
searchButton = (function(){
  const button = document.getElementById("searchButton")
  const city = document.getElementById("citySelect");
  const state = document.getElementById("stateSelect")
  const statesABBR = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  for(i = 0; i < statesABBR.length; i++){
    let option = document.createElement("option");
    option.value = statesABBR[i];
    option.textContent = statesABBR[i];
    state.appendChild(option);
  }

  button.addEventListener("click", (e) => {
    e.preventDefault();
    if(city.value == ""){
      alert("Please enter a city");
    }else{
      fetchData(city.value, state.value)
    }
  })
})();

function searchBar(){
  let city = prompt("Enter City Name:");
  let state = prompt("Enter State Abbreviation:");
  fetchData(city,state);
}

function fetchData(city,state){
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${state}?key=8ZGN2QWRXUQPWSB32K3YZ9ZGH`, {mode: "cors"})
  .then(function(response){
    return response.json();
  }).then(function(response){
    let address = (response.resolvedAddress);
    let temp = (response.currentConditions.temp)
    let time = (response.currentConditions.datetime)
    Display(address, time, temp);
  })
  .catch(function(err){
    alert("Failed:"+err);
  })
}

function Display(address,time,temp){
  let displayAddress = document.createElement("p");
  let displayTime = document.createElement("p");
  let displayTemp = document.createElement("p");
  const weatherDisplay = document.getElementById("Weather");

  time = time.split(':');

  let hours = Number(time[0]);
  let minutes = Number(time[1]);

  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
  } else if (hours > 12) {
    timeValue= "" + (hours - 12);
  } else if (hours == 0) {
    timeValue= "12";
  }
  
  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
  timeValue += (hours >= 12) ? " P.M." : " A.M.";

  displayAddress.textContent = address;
  displayTime.textContent = timeValue;
  displayTemp.textContent = temp+"F";
  weatherDisplay.appendChild(displayAddress);
  weatherDisplay.appendChild(displayTime);
  weatherDisplay.appendChild(displayTemp);
}
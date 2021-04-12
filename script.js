/* 
    Use the current weather API (https://openweathermap.org/current) to display the current weather and other info of the city entered by the user in the input after the user presses enter on the input.

    Hourly wheather api? pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid={API key}
*/

var now;

var newTime = function() {
    setInterval(function() {
        now = moment().format("MMM DD, YYYY")
        $("#todaysDate").text(now);
    
    }, 200);
}
newTime();

var day2 = moment().add(1, 'days').format("MMM DD, YYYY");
var day3 = moment().add(2, 'days').format("MMM DD, YYYY");
var day4 = moment().add(3, 'days').format("MMM DD, YYYY");
var day5 = moment().add(4, 'days').format("MMM DD, YYYY");
var day6 = moment().add(5, 'days').format("MMM DD, YYYY");

document.getElementById("day2").innerText=day2;
document.getElementById("day3").innerText=day3;
document.getElementById("day4").innerText=day4;
document.getElementById("day5").innerText=day5;
document.getElementById("day6").innerText=day6;

var API_KEY="ecdbd9523e9e6a5a78ae5d731dee3481";

// "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid="+API_KEY+""

document.getElementById("cityForm").addEventListener("submit",function(event) {
    event.preventDefault();








    var cityName=document.getElementById("cityNameInput").value;
    if(!cityName) {
        alert("Please enter the name of a city.");
    } else {
        document.getElementById("cityName").innerText=cityName;

        var requestUrl="http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+API_KEY+"";

        fetch(requestUrl).then(function(response) {
            if(!response.ok) {
                alert("No information found for "+cityName+"");
            } 
            return response.json();
            
        }).then(function(data) {
            console.log(data);
            
            var latitude=data.coord.lat;
            var longitude=data.coord.lon;
            
            var requestUrlTwo="https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid="+API_KEY+"";

            fetch(requestUrlTwo).then(function(response) {

                if(!response.ok) {
                    alert("No forecast found for "+cityName+"");
                }
                return response.json();
            }).then(function(data) {
                console.log(data);

                document.getElementById("currentUV").innerText=data.current.uvi;


                //Forecast Temperature

                document.getElementById("temp2").innerText=farenheit2
                var kelvin2=data.daily[0].temp.day;
                var celsius2 = kelvin2 -273.15;
                var farenheit2 = celsius2 * (9/5) + 32;
                farenheit2 = Math.floor(farenheit2);

                document.getElementById("temp3").innerText=farenheit3
                var kelvin3=data.daily[1].temp.day;
                var celsius3 = kelvin3 -273.15;
                var farenheit3 = celsius3 * (9/5) + 32;
                farenheit3 = Math.floor(farenheit3);

                document.getElementById("temp4").innerText=farenheit4
                var kelvin4=data.daily[2].temp.day;
                var celsius4 = kelvin4 -273.15;
                var farenheit4 = celsius4 * (9/5) + 32;
                farenheit4 = Math.floor(farenheit4);

                document.getElementById("temp5").innerText=farenheit5
                var kelvin5=data.daily[3].temp.day;
                var celsius5 = kelvin5 -273.15;
                var farenheit5 = celsius5 * (9/5) + 32;
                farenheit5 = Math.floor(farenheit5);

                document.getElementById("temp6").innerText=farenheit6
                var kelvin6=data.daily[4].temp.day;
                var celsius6 = kelvin6 -273.15;
                var farenheit6 = celsius6 * (9/5) + 32;
                farenheit6 = Math.floor(farenheit6);


                //Forecast image

                var img2 = document.querySelector("imgW2")
                var tempimg2 = data['weather'][0]['icon']
                img2.innerHTML = "http://openweathermap.org/img/w/" +tempimg2+ ".png' alt='Icon depicting current weather.'>"
                console.log(data);


                var img3 = document.querySelector("imgW3")
                var tempimg3 = data['weather'][1]['icon']
                img3.innerHTML = "http://openweathermap.org/img/w/" +tempimg3+ ".png' alt='Icon depicting current weather.'>"

                var img4 = document.querySelector("imgW4")
                var tempimg4 = data['weather'][2]['icon']
                img4.innerHTML = "http://openweathermap.org/img/w/" +tempimg4+ ".png' alt='Icon depicting current weather.'>"

                var img5 = document.querySelector("imgW5")
                var tempimg5 = data['weather'][3]['icon']
                img5.innerHTML = "http://openweathermap.org/img/w/" +tempimg5+ ".png' alt='Icon depicting current weather.'>"

                var img6 = document.querySelector("imgW6")
                var tempimg6 = data['weather'][4]['icon']
                img6.innerHTML = "http://openweathermap.org/img/w/" +tempimg6+ ".png' alt='Icon depicting current weather.'>"



                //Forecast humidity

                document.getElementById("hum2").innerText=data.daily[0].humidity;
                document.getElementById("hum3").innerText=data.daily[1].humidity;
                document.getElementById("hum4").innerText=data.daily[2].humidity;
                document.getElementById("hum5").innerText=data.daily[3].humidity;
                document.getElementById("hum6").innerText=data.daily[4].humidity;
 



            });

            var kelvin=data.main.temp;
            var celsius = kelvin -273.15;
            var farenheit = celsius * (9/5) + 32;
            farenheit = Math.floor(farenheit);

            document.getElementById("currentTemperature").innerText=farenheit;
            document.getElementById("currentHumidity").innerText=data.main.humidity;
            document.getElementById("currentWind").innerText=data.wind.speed;



        })
        
    }
    
})

//This passes the searched city onto this list of clickable buttons
/*
button.addEventListener("click", function() {
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";
}) */
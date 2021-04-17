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
        document.getElementById("cityName").innerText="Not a valid city"
    } else {
        document.getElementById("cityName").innerText=cityName;

        var requestUrl="http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+API_KEY+"";

        fetch(requestUrl).then(function(response) {
            if(!response.ok) {
                document.getElementById("cityName").innerText="Not a valid city";
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

                //uvi color and number
                document.getElementById("currentUV").innerText=data.current.uvi;
                var uvColor=data.current.uvi;
                if (uvColor <=2) {document.getElementById("currentUV").style.backgroundColor="#349721";
                } else if (uvColor <=5) {document.getElementById("currentUV").style.backgroundColor="#fff400";
                } else if (uvColor <=7) {document.getElementById("currentUV").style.backgroundColor="#ff9a00";
                } else if (uvColor <=10) {document.getElementById("currentUV").style.backgroundColor="#ff0000";
                } else {document.getElementById("currentUV").style.backgroundColor="#7c00ff";
                }


                //Forecast Temperature

                var kelvin2=data.daily[0].temp.day;
                console.log(kelvin2)
                var celsius2 = kelvin2 -273.15;
                var farenheit2 = celsius2 * (9/5) + 32;
                farenheit2 = Math.floor(farenheit2);
                document.getElementById("temp2").innerText=farenheit2

                var kelvin3=data.daily[1].temp.day;
                console.log(kelvin3)
                var celsius3 = kelvin3 -273.15;
                var farenheit3 = celsius3 * (9/5) + 32;
                farenheit3 = Math.floor(farenheit3);
                document.getElementById("temp3").innerText=farenheit3

                var kelvin4=data.daily[2].temp.day;
                var celsius4 = kelvin4 -273.15;
                var farenheit4 = celsius4 * (9/5) + 32;
                farenheit4 = Math.floor(farenheit4);
                document.getElementById("temp4").innerText=farenheit4

                var kelvin5=data.daily[3].temp.day;
                var celsius5 = kelvin5 -273.15;
                var farenheit5 = celsius5 * (9/5) + 32;
                farenheit5 = Math.floor(farenheit5);
                document.getElementById("temp5").innerText=farenheit5

                var kelvin6=data.daily[4].temp.day;
                var celsius6 = kelvin6 -273.15;
                var farenheit6 = celsius6 * (9/5) + 32;
                farenheit6 = Math.floor(farenheit6);
                document.getElementById("temp6").innerText=farenheit6

                //Forecast image
/*
                var img2 = document.querySelector("imgW2")
                console.log(data);
                var tempimg2 = data['weather'][0]['icon']
                console.log(data);
                img2.innerHTML = "http://openweathermap.org/img/w/" +tempimg2+ ".png' alt='Icon depicting current weather.'>"


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

*/

                //Forecast humidity

                document.getElementById("hum2").innerText=data.daily[0].humidity;
                document.getElementById("hum3").innerText=data.daily[1].humidity;
                document.getElementById("hum4").innerText=data.daily[2].humidity;
                document.getElementById("hum5").innerText=data.daily[3].humidity;
                document.getElementById("hum6").innerText=data.daily[4].humidity;
 



            

            var kelvin = data.daily[0].temp.day
            var celsius = kelvin -273.15;
            var farenheit = celsius * (9/5) + 32;
            farenheit = Math.floor(farenheit);

            document.getElementById("currentTemperature").innerText=farenheit;
            document.getElementById("currentHumidity").innerText=data.daily[0].humidity;
            document.getElementById("currentWind").innerText=data.daily[0].wind_speed;


            //Get weather pic
 
            weather2=data.daily[0].weather.main;
            weather2="Clouds";
                if (weather2 == "Clouds") {
            var cloud = document.createElement("img");
            cloud.src = "assets/cloud.jpg";
            cloud.setAttribute("src", "assets/cloud.jpg");
            var src = document.getElementById("imgW2");
            src.appendChild(cloud);
            } else if (weather2 == "Rain") {
            var rain = document.createElement("img");
            rain.src = "assets/rain.jpg";
            var src = document.getElementById("imgW2");
            src.appendChild(rain);
            } else if (weather2 = "Snow") {
            var snow;
            snow.src = "assets/snow.jpg";
            var src = document.getElementById("imgW2");
            src.appendChild(snow);
            } else {
            var clear;
            clear.src = "assets/sun.jpg";
            var src = document.getElementById("imgW2");
            src.appendChild(snow);
            }

            var weather3=data.daily[1].weather.main;
                if (weather3 = "Clouds") {
            var cloud;
            cloud.src = "assets/cloud.jpg";
            var src = document.getElementById("imgW3");
            src.appendChild(cloud);
            } else if (weather3 = "Rain") {
            var rain;
            rain.src = "assets/rain.jpg";
            var src = document.getElementById("imgW3");
            src.appendChild(rain);
            } else if (weather3 = "Snow") {
            var snow;
            snow.src = "assets/snow.jpg";
            var src = document.getElementById("imgW3");
            src.appendChild(snow);
            } else {
            var clear;
            clear.src = "assets/sun.jpg";
            var src = document.getElementById("imgW3");
            src.appendChild(snow);
            }

            var weather4=data.daily[2].weather.main;
                if (weather4 = "Clouds") {
            var cloud;
            cloud.src = "assets/cloud.jpg";
            var src = document.getElementById("imgW4");
            src.appendChild(cloud);
            } else if (weather4 = "Rain") {
            var rain;
            rain.src = "assets/rain.jpg";
            var src = document.getElementById("imgW4");
            src.appendChild(rain);
            } else if (weather4 = "Snow") {
            var snow;
            snow.src = "assets/snow.jpg";
            var src = document.getElementById("imgW4");
            src.appendChild(snow);
            } else {
            var clear;
            clear.src = "assets/sun.jpg";
            var src = document.getElementById("imgW4");
            src.appendChild(snow);
            }

            var weather5=data.daily[3].weather.main;
                if (weather5 = "Clouds") {
            var cloud;
            cloud.src = "assets/cloud.jpg";
            var src = document.getElementById("imgW5");
            src.appendChild(cloud);
            } else if (weather5 = "Rain") {
            var rain;
            rain.src = "assets/rain.jpg";
            var src = document.getElementById("imgW5");
            src.appendChild(rain);
            } else if (weather5 = "Snow") {
            var snow;
            snow.src = "assets/snow.jpg";
            var src = document.getElementById("imgW5");
            src.appendChild(snow);
            } else {
            var clear;
            clear.src = "assets/sun.jpg";
            var src = document.getElementById("imgW5");
            src.appendChild(snow);
            }

            var weather4=data.daily[4].weather.main;
                if (weather6 = "Clouds") {
            var cloud;
            cloud.src = "assets/cloud.jpg";
            var src = document.getElementById("imgW6");
            src.appendChild(cloud);
            } else if (weather6 = "Rain") {
            var rain;
            rain.src = "assets/rain.jpg";
            var src = document.getElementById("imgW6");
            src.appendChild(rain);
            } else if (weather6 = "Snow") {
            var snow;
            snow.src = "assets/snow.jpg";
            var src = document.getElementById("imgW6");
            src.appendChild(snow);
            } else {
            var clear;
            clear.src = "assets/sun.jpg";
            var src = document.getElementById("imgW6");
            src.appendChild(snow);
            }










            // Clear Rain Clouds Snow



            document.getElementById("imgW2").innerText=data.daily[0].weather.main;
            document.getElementById("imgW3").innerText=data.daily[1].weather.main;
            document.getElementById("imgW4").innerText=data.daily[2].weather.main;
            document.getElementById("imgW5").innerText=data.daily[3].weather.main;
            document.getElementById("imgW6").innerText=data.daily[4].weather.main;

        });            


        })
        
    }
    
})

//This passes the searched city onto this list of clickable buttons

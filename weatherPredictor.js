const cityInput = document.querySelector("#cityInput")
const searchBox = document.querySelector(".search-box")
const loading = document.querySelector("#loading")
let cityName = document.querySelector("#cityName")
const temperature = document.querySelector("#temp")
const description = document.querySelector("#desc")
const humidity = document.querySelector("#humidity")
const body = document.querySelector("body")
const outfitAdvice = document.querySelector("#outfitAdvice")

// User input se jo `.value` aayegi




searchBox.addEventListener("click", function (e) {

    if (e.target.closest("#searchBtn")) {




        validateUserInput(cityInput.value)

    }



})



function validateUserInput(userInput) {

    const cityRegex = /^[a-zA-Z\s]+$/;

    if (!userInput) return


    if (!cityRegex.test(userInput) || userInput === "") {

        alert("Please enter the correct city name")

        return

    }

    weatherPredictor(userInput)

}



async function weatherPredictor(city) {


    // console.log(city)

    const apiKey = "85f1fd645a8550563243c04a20806520"


    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

        const data = await response.json()




        if (!response.ok) {


            throw new Error("we encountered some error");

            return

        }



        renderData(data)

    } catch (error) {

        console.log("Something went wrong", error)

        return;

    }
}



function renderData(x) {



    description.textContent = x.weather[0].description

    temperature.textContent = Math.floor(x.main.temp)

    cityName.textContent = x.name


    humidity.textContent = x.main.humidity


    advisor(temperature.textContent, humidity.textContent)


}


function advisor(temp, humi) {

    console.log(temp, humi)



    if (temp > 35) {
        body.style.backgroundColor = "#d63031"; // Hot
        outfitAdvice.textContent = "Ekdam garm, alert red feel."
    }
    // 1. Dono conditions wale blocks ko upar rakhein
    else if (humi > 85 && temp <= 25) {
        body.style.backgroundColor = "#636e72"; // Very Humid & Cool/Warm
        outfitAdvice.textContent = " Ujdda chaman chips-chipa weather fill."

    }
    else if (temp > 28 && humi > 70) {
        body.style.backgroundColor = "#fdcb6e"; // Warm & Humid
        outfitAdvice.textContent = "Chai-samosa ghumne wala feel."
    }
    // 2. Sirf single temperature check karne wale blocks neeche
    else if (temp >= 18) {
        body.style.backgroundColor = "#55efc4"; // Normal/Pleasant
        outfitAdvice.textContent = "Thanda aur freezing cold vibe."
    }
    else if (temp < 18) {
        // Pehle < 15 tha, jisse 15-17 miss ho raha tha. Ab 18 se kam sab cover hoga.
        body.style.backgroundColor = "#74b9ff"; // Cold
        outfitAdvice.textContent = " Baarish ya kaale baadal wala gloomy feel."
    }
    else {
        console.log("error");
    }








}

// advisor(40 , 92 )
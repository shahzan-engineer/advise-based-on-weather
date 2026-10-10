const cityInput = document.querySelector("#cityInput")
const searchBox = document.querySelector(".search-box")
const loading = document.querySelector("#loading")
const cityName = document.querySelector("#cityName")
const temperature = document.querySelector("#temp")
const description = document.querySelector("#desc")


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


    console.log(city)

    const apiKey = "85f1fd645a8550563243c04a20806520"


    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

        const data = await response.json()

        if (!response.ok) {


            throw new Error("we encountered some error");

            return

        }



        renderData(response)

    } catch (error) {

        console.log("Something went wrong", error)

        return;

    }
}



function renderData(x) {


    console.log(x.name)
    console.log(x.main.temp)

}
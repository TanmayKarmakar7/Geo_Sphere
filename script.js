let allCountriesData;
const url = "https://restcountries.com/v3.1/all";
const countryContainer = document.querySelector(".countries-container");
const checkbox = document.getElementById("checkbox");
const filterRegion = document.querySelector(".filter-region");
const searchInput = document.querySelector(".search-container input");

// Dark mode toggle function
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    document.querySelector("header").classList.toggle("dark");
    document.querySelector(".search-container").classList.toggle("dark");
    document.querySelector(".search-container input").classList.toggle("dark");
    document.querySelector(".filter-region").classList.toggle("dark");

    const countryCards = document.querySelectorAll(".country-card");
    countryCards.forEach(card => {
        card.classList.toggle("dark");
    });
}

// Check localStorage for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    checkbox.checked = true;
    toggleDarkMode(); // Apply dark mode if saved as dark
}

// Add event listener to the checkbox for dark mode
checkbox.addEventListener("change", () => {
    toggleDarkMode();
    
    // Save theme to localStorage
    if (checkbox.checked) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});


// data fetch and show
async function getData(){
    let response = await fetch(url);
    let data = await response.json();

    allCountriesData = data;

    data.forEach(country => {  
        const countryCard = document.createElement("a");
        countryCard.classList.add("country-card");

        countryCard.href = `./country.html?name=${country.name.common}`;

        countryCard.innerHTML = `
            <div class="country-flag">
                <img src="${country.flags.png}" alt="flag" loading="lazy">
            </div>
            <div class="country-details">
                <h3>${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>
        `;

        countryContainer.append(countryCard);

        // check dark mode is already active
        if (document.body.classList.contains('dark')) {
            countryCard.classList.add("dark");
        }
    });
}

getData();

// header scroll function
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
        header.classList.add("border-b", "border-secondaryColor");
    } else {
        header.classList.remove("border-b", "border-secondaryColor");
    }
});

// filter by region
filterRegion.addEventListener("change", (e) => {
    fetch(`https://restcountries.com/v3/region/${e.target.value}`).then((res) => res.json()).then((data) => {

        countryContainer.innerHTML = "";     

        data.forEach(country => {              
            const countryCard = document.createElement("a");
            countryCard.classList.add("country-card");
            
            countryCard.href = `/country.html?name=${country.name.common}`;
            
            countryCard.innerHTML = `
                <div class="country-flag">
                    <img src="${country.flags[1]}" alt="flag" loading="lazy">
                </div>
                <div class="country-details">
                    <h3>${country.name.common}</h3>
                    <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Capital: </b>${country.capital}</p>
                </div>
            `;
    
            countryContainer.append(countryCard);
    
            // Apply dark mode to the newly created card if dark mode is already active
            if (document.body.classList.contains('dark')) {
                countryCard.classList.add("dark");
            }
            
        });
        
    })
    
})


// search filter
searchInput.addEventListener("input", (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))

    countryContainer.innerHTML = "";
    
    filteredCountries.forEach(country => {  
        const countryCard = document.createElement("a");
        countryCard.classList.add("country-card");

        countryCard.href = `/country.html?name=${country.name.common}`;

        countryCard.innerHTML = `
            <div class="country-flag">
                <img src="${country.flags.png}" alt="flag" loading="lazy">
            </div>
            <div class="country-details">
                <h3>${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>
        `;

        countryContainer.append(countryCard);

        // check dark mode is already active
        if (document.body.classList.contains('dark')) {
            countryCard.classList.add("dark");
        }
    })
})

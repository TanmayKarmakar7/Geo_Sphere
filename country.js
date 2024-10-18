const countryName = new URLSearchParams(location.search).get("name");
const main = document.querySelector("main");

document.title = `${countryName} - Geo Sphere`;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.querySelector("header").classList.add("dark");
    document.querySelector(".back-btn").classList.add("dark");
    document.getElementById("checkbox").checked = true; // Set checkbox state based on saved theme
}

async function getCountryData() {
    try {
        let response = await fetch(`https://restcountries.com/v3/name/${countryName}?fullText=true`);
        let data = await response.json();
        let country = data[0];
        console.log(country);
        

        // Extracting currencies and languages
        const currencies = Object.values(country.currencies || {}).map(currency => currency.name).join(', ') || "-------";
        const languages = Object.values(country.languages || {}).join(', ') || "-------";
        const timezones = country.timezones.join(', ') || "-------";
        

        const borderContries = document.createElement("div");
        borderContries.classList.add("border-countries");

        const p = document.createElement("p");
        p.innerHTML = "Border Countries : ";

        borderContries.append(p);

        if(country.borders){
            country.borders.forEach(border => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => res.json()).then((borderCountry) => {
;
                    const a = document.createElement("a");
                    a.href = `country.html?name=${borderCountry[0].name.common}`
                    a.innerHTML = borderCountry[0].name.common;
                    borderContries.append(a);
                    document.querySelector(".country-details").append(borderContries);
                })
            });
        }

        const countryCard = document.createElement("div");
        countryCard.classList.add("country-container");

        countryCard.innerHTML = `
            <div class="country-flag">
                <img src="${country.flags[1]}" alt="Flag" loading="lazy">
            </div>
            <div class="country-details">
                <h3>${country.name.common || "-------"}</h3>
                <ul>
                    <li><b>Native Name: </b>${country.name.nativeName?.eng?.official || countryName}</li>
                    <li><b>Population: </b>${country.population.toLocaleString('en-IN') || "-------"}</li>
                    <li><b>Area: </b>${country.area.toLocaleString('en-IN') || "-------"} Square km</li>
                    <li><b>Region: </b>${country.region || "-------"}</li>
                    <li><b>Sub Region: </b>${country.subregion || "-------"}</li>
                    <li><b>Capital: </b>${country.capital || "-------"}</li>
                    <li><b>Top Level Domain: </b>${country.tld || "-------"}</li>
                    <li><b>Currencies: </b>${currencies}</li>
                    <li><b>Languages: </b>${languages}</li>
                    <li><b>Timezones: </b>${timezones}</li>
                    <li><b>UN Member: </b>${country.unMember ? "Yes" : "No"}</li> 
                    <li><b>Country Code: </b>${country.idd?.root || "-------"}${country.idd?.suffixes[0] || "-------"}</li> 
                    <li><b>Independent: </b>${country.independent ? "Yes" : "No"}</li> 
                </ul>
            </div>
        `;
        main.append(countryCard);
    } catch (error) {
        console.error("Error fetching country data:", error);
        main.innerHTML = `<p>Error fetching country details. Please try again later.</p>`;
    }
}

getCountryData();

// Dark mode toggle and save to localStorage
const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    document.querySelector("header").classList.toggle("dark");
    document.querySelector(".back-btn").classList.toggle("dark");

    // Save the current theme to localStorage
    if (checkbox.checked) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// Header scroll effect
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
        header.classList.add("border-b", "border-secondaryColor");
    } else {
        header.classList.remove("border-b", "border-secondaryColor");
    }
});

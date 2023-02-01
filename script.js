let input = document.getElementById('input-text');
let btn = document.getElementById('btn');
let timezoneSection = document.getElementById('timezone');
let addressSection = document.getElementById('addressSection');
let errorInput = document.getElementById('error');



function CurrentLocation() {

    navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;
    
        fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${Key}`)
            .then(response => response.json())
            .then(data => {
                let result = data.results[0];

                timezoneSection.innerHTML =
                    `
                    <p>Name Of The Zone : ${result.timezone.name}</p>
                    <table>
                        <tr>
                            <td>Lat : ${result.lat}</td>
                            <td>Long : ${result.lon}</td>
                        </tr>
                    </table>
                    <p>Offset STD : ${result.timezone.offset_STD}</p>
                    <p>Offset STD Seconds : ${result.timezone.offset_STD_seconds}</p>
                    <p>Offset Dst : ${result.timezone.offset_DST}</p>
                    <p>Offset Dst Seconds : ${result.timezone.offset_DST_seconds}</p>
                    <p>Country : ${result.country}</p>
                    <p>Postcode : ${result.postcode}</p>
                    <p>City : ${result.city}</p>
                    `
            })
            .catch((error) => {
                console.error(error);
            })
    })
}

function retriveTimezoneUsingAddress(e) {
    e.preventDefault();

    let address = input.value;
  

    if (address == "") {
        errorInput.innerHTML = `Please enter an address!`
        errorInput.style.color = 'red'
    } else {
        errorInput.innerHTML = "";

        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${Key}`)
            .then(response => response.json())
            .then(data => {
             

                let addressResult = data.features[0].properties;

                addressSection.innerHTML =
                    `
                    <div>
                        <h1>Your Result</h1>
                        <p>Name Of The Zone : ${addressResult.name ?? "Not Found!"}</p>
                        <table>
                            <tr>
                                <td>Lat : ${addressResult.lat ?? "Not Found!"}</td>
                                <td>Long : ${addressResult.lon ?? "Not Found!"}</td>
                            </tr>
                        </table>
                        <p>Offset STD : ${addressResult.timezone.offset_STD ?? "Not Found!"}</p>
                        <p>Offset STD Seconds : ${addressResult.timezone.offset_STD_seconds ?? "Not Found!"}</p>
                        <p>Offset Dst : ${addressResult.timezone.offset_DST ?? "Not Found!"}</p>
                        <p>Offset Dst Seconds : ${addressResult.timezone.offset_DST_seconds ?? "Not Found!"}</p>
                        <p>Country : ${addressResult.country ?? "Not Found!"}</p>
                        <p>Postcode : ${addressResult.postcode ?? "Not Found!"}</p>
                        <p>City : ${addressResult.city ?? "Not Found!"}</p>
                    <div/>
                    `
            })
            .catch((error) => {
                console.error(error);
                errorInput.innerHTML = `Time zone could not be found.`;
                errorInput.style.color = 'red';
            })
        }
        addressSection.innerHTML = "";
}


window.addEventListener('load', CurrentLocation);
btn.addEventListener('click', retriveTimezoneUsingAddress);
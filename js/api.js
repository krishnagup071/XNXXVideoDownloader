const apiKey = 'wMfNKEtRwrojAydNNplBXL9NpP46yXeuadATnsrjh3I';
let img = document.querySelector('#thumbnail');
let h1 = document.querySelector('#title');
let low = document.querySelector('#low');
let high = document.querySelector('#high');
let res = document.querySelector('.responce');
//Function to show loading screen
//my apikey is public so everyone can use it i want to make it private but i dont know how to do that
//copilot make it private now

const showLoading = () => {
    res.style.display = 'none'; // Hide the response section initially
    img.src = 'https://cdn.dribbble.com/users/116207/screenshots/3848910/media/2c3f1b8d4a5e6f7b9c8f0d3e4a5b6c7d.gif'; // Set a loading GIF
    h1.textContent = 'Loading...'; // Set a loading message
    low.style.display = 'none'; // Hide the low quality button
    high.style.display = 'none'; // Hide the high quality button
    img.style.display = 'block'; // Show the image element
    h1.style.display = 'block'; // Show the title element
};

const getvideo = async () => {
    const userInput = document.getElementById('videoUrl').value; // Get value when button is clicked
    if (!userInput) {
        alert('Please enter a video URL');
        return; // Exit the function if no input is provided
    }
    showLoading(); // Show loading screen

    try {
        res.style.display = 'block'; // Show the response section
        const URL = `https://api.adultdatalink.com/xnxx/video-information?video_url=${userInput}`;
        let response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response); // Logs the Response object
        let data = await response.json(); // Await the JSON parsing.
        console.log(data);
        var img_url = data.thumbnail_url // Set the image source to the thumbnail URL
        img.src = img_url; // Update the image source
        if (!img_url) {
            img.src = '404.jpeg'; // Set a default image if thumbnail URL is not available
        }
        h1.textContent = data.title; // Update the title with the video title
        low.addEventListener('click', () => {
            open(data.low_url, '_blank'); // Open the video URL in a new tab when the button is clicked
            //save the video URL in a new tab when the button is clicked

        })
        high.addEventListener('click', () => {
            open(data.high_url, '_blank'); // Open the video URL in a new tab when the button is clicked
        });
    } catch (error) {
        // Handle any errors that occur during the fetch or parsing
        res.style.display = 'none'; // Hide the response section on error
        img.src = '404.jpeg'; // Set a default image on error
        h1.textContent = 'Error fetching video information'; // Set an error message
        low.style.display = 'none'; // Hide the low quality button on error
        high.style.display = 'none'; // Hide the high quality button on error
        console.error("Error fetching or parsing data:", error);
    }
    img.style.display = 'block'; // Show the image element
    h1.style.display = 'block'; // Show the title element
    low.style.display = 'block'; // Show the low quality button
    high.style.display = 'block'; // Show the high quality button

};

document.getElementById('downloadBtn').addEventListener('click', getvideo);
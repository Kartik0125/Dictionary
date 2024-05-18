const url = "https://api.dictionaryapi.dev/api/v2/entries/en";
let input = document.querySelector("input");
let btn = document.querySelector("#search-btn");
let audioElement = document.getElementById("sound");

const getData = async (inputVal) => {
  try {
    let response = await fetch(`${url}/${inputVal}`);
    if (!response.ok) {
      throw new Error("Word not found");
    }
    let data = await response.json();
    document.querySelector(".text").innerHTML = "";
    let div = document.createElement("div");
    div.classList.add("detail");

    const phoneticAudio = data[0].phonetics.find(phonetic => phonetic.audio) || {};

    div.innerHTML = `
      <h2 style=" font-size: 30px;color: #575a7b;"><span style="color: #000;">${data[0].word}</span>
        ${phoneticAudio.audio ? `<button onclick="playSound('${phoneticAudio.audio}')">
          <i class="fas fa-volume-up"></i>
        </button>` : ''}
      </h2>
      <div class="word-details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>/${data[0].phonetic}/</p>
      </div>
      <p class="word-meaning">Meaning: <span>${data[0].meanings[0].definitions[0].definition}</span></p>
      <p class="word-example">Example: <span>${data[0].meanings[0].definitions[0].example === undefined ? "Not Found" : data[0].meanings[0].definitions[0].example}</span></p>
      <a href="${data[0].sourceUrls[0]}" target="_blank">Read More...</a>
    `;
    document.querySelector(".text").append(div);
    console.log(data);
  } catch (error) {
    document.querySelector(".text").innerHTML = `<h3 class="error">Couldn't Find the Word</h3>`;
    console.error(error);
  }
};

function playSound(audioSrc) {
  console.log("Playing sound from:", audioSrc); 
  audioElement.src = audioSrc;
  audioElement.play().catch(error => {
    console.error("Error playing audio:", error);
  });
}

btn.addEventListener("click", () => {
  let inputVal = input.value;
  if (inputVal === "") {
    alert("Please Enter the word First!!!");
  } else {
    getData(inputVal);
  }
});

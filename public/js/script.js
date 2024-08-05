// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: aplayer,
    audio: [{
      name: dataSong.title,
      artist: dataSinger.fullName,
      url: dataSong.audio,
      cover: dataSong.avatar
    }],
    autoplay: true
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on('play', function () {
    avatar.style.animationPlayState = "running";
  });

  ap.on('pause', function () {
    avatar.style.animationPlayState = "paused";
  });

  ap.on('ended', function () {
    fetch(`/songs/listen/${dataSong._id}`, {
      method: "PATCH"
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          const innerListen = document.querySelector(".singer-detail .inner-actions .inner-listen .inner-number");
          innerListen.innerHTML = data.listen;
        }
      })
  });
}
// End APlayer

// Button Like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains('active');
    const typeLike = isActive ? 'dislike' : 'like';

    const link = `/songs/like/${typeLike}/${idSong}`

    const option = {
      method: "PATCH"
    }
    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.code == 200) {
          const elementNumber = buttonLike.querySelector('.inner-number');
          elementNumber.innerHTML = data.like
          buttonLike.classList.toggle('active');
        }
      })
  })
}
// End Button Like

// Button Favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite.length > 0) {
  listButtonFavorite.forEach(buttonFavorite => {
    buttonFavorite.addEventListener("click", () => {
      const id = buttonFavorite.getAttribute("button-favorite");
      const status = buttonFavorite.classList.contains("active") ? "unfavorite" : "favorite";

      const link = `/songs/favorite/${status}/${id}`;
      const option = {
        method: 'PATCH'
      }
      fetch(link, option)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.code == 200) {
            buttonFavorite.classList.toggle("active");
          }
        })
    })
  })

}
// End Button Favorite

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");
  const innerSuggest = boxSearch.querySelector('.inner-suggest');
  input.addEventListener("keyup", () => {
    const keyword = input.value;
    if (keyword != '') {
      fetch(`/search/suggest?keyword=${keyword}`)
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            const songs = data.songs;
            const innerList = boxSearch.querySelector(".inner-list");
            console.log(innerSuggest);
            if (songs.length > 0) {
              boxSuggest.classList.add('show');
              const htmlsArray = songs.map(item => `
                <a class="inner-item" href="/songs/detail/${item.slug}">
                  <div class="inner-image">
                    <img src="${item.avatar}">
                  </div>
                  <div class="inner-info">
                    <div class="inner-title">${item.title}</div>
                    <div class="inner-singer">
                      <i class="fa-solid fa-microphone-lines"></i> ${item.infoSinger.fullName}
                    </div>
                    </div>
                </a>
              `);
              innerList.innerHTML = htmlsArray.join("");
              innerSuggest.classList.add("show");
            } else {
              innerList.innerHTML = "";
              innerSuggest.classList.remove("show");
            }
          }
        })
    }
    else {
      innerSuggest.classList.remove("show");
    }
  });
}
// End Search Suggest
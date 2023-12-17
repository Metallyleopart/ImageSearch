// kunci dari unsplash
const accessKey = 'xYhKAP5qZYQ_jd_8SO6jlO8e_ZjZZnrcUM7DYXIiNkI';

// ambil semua input
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchresult = document.getElementById('search-result');
const searchBtn = document.getElementById('search-btn');
const moreBtn = document.getElementById('show-more');
const refresh = document.getElementById('refresh');

let previousKeywords = '';
let keywords = '';
let page = 1;

// fungi asyncronus
async function search() {
  keywords = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keywords}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  // jika panjang value tidak lebih dari 0
  if (searchBox.value.length == 0) {
    alert('Isi dulu bang');
    // jika panjang value lebih dari 0
  } else {
    results.map((result) => {
      const image = document.createElement('img');
      // tampilkan skeleton jika gambar belum siap
      image.classList.add('skeleton');
      image.loading = 'lazy';
      const imageLink = document.createElement('a');
      imageLink.href = result.links.html;
      imageLink.target = '_blank';

      imageLink.appendChild(image);
      searchresult.appendChild(imageLink);

      // hilangkan skeleton jika gambar siap
      image.onload = () => {
        image.classList.remove('skeleton');
      };
      image.src = result.urls.small;
    });
    // buat semua display yang hidden menjadi block
    moreBtn.style.display = 'block';
    refresh.style.display = 'block';
    console.log(page);
  }
}

// fungsi refresh
function refreshWindow() {
  window.location.reload();
}

// memetiksa button dengan id search-result
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (searchBox.value !== previousKeywords) {
    previousKeywords = searchBox.value;
    searchresult.innerHTML = '';
    page = 1;
    search();
    console.log(page);
  } else {
    if (searchBox.value.length == 0) {
      alert('Isi dulu bang');
    } else {
      alert('Ubah dulu bang');
    }
  }
});

// memetiksa button dengan id show-more
moreBtn.addEventListener('click', () => {
  page++;
  search();
  console.log(page);
});

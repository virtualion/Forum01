const listMuseums = document.getElementById('listMuseums')
const attachMuseum = ({thumbnail, category, title, like, liked, view, link}) => {
  listMuseums.innerHTML += `
    <div class="museum-item" data-filter="${category}">
      <a href="${link}" target="_blank"><img src="${thumbnail}" class="img" alt=""/></a>

      <div class="information">
        <p class="bodyMediumMedium title">${title}</p>

        <div class="statistic">
          <div class="item likeBtn ${liked ? "liked" : ""}">
            <!-- Love Icon -->
            <img src="assets/icon/heart.png" class="icon like" alt=""/>
            <img src="assets/icon/heart-gray.png" class="icon unlike" alt=""/>
            <p class="label">${like}</p>
          </div>
          <div class="item">
            <!-- Eye Icon -->
            <img src="assets/icon/eye.png" class="icon" alt=""/>
            <p class="label">${view}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    data.map(({thumbnail, category, title, like, liked, view, link}, index) => attachMuseum({thumbnail, category, title, like, liked, view, link}))
  })
  .catch(error => console.log(error));


// Search Data Museum By Title
let cards = document.querySelectorAll('.box')
    
function searchMuseum() {
    let search_query = document.getElementById("search-museum").value;
    listMuseums.innerHTML = ''

    return fetch('data.json')
      .then(response => response.json())
      .then(data => {
        data
          .filter(value => value.title.toLocaleLowerCase().includes(search_query.toLocaleLowerCase()))
          .map(({thumbnail, category, title, like, liked, view, link}, index) => attachMuseum({thumbnail, category, title, like, liked, view, link}))
        listMuseums.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch(error => console.log(error));
}

//A little delay
let typingTimer;               
let typeInterval = 500;  
let searchInput = document.getElementById('search-museum');

searchInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(searchMuseum, typeInterval);
});

// Search Data Musuem By Trending Search
const trendings = document.querySelectorAll('.trending-item');
trendings.forEach(trending => { 
  trending.addEventListener('click', function(e) {
    let selectedFilter = trending.getAttribute('data-search');
    let itemsToHide = document.querySelectorAll(`.list-museums .museum-item:not([data-filter='${selectedFilter}'])`);
    let itemsToShow = document.querySelectorAll(`.list-museums [data-filter='${selectedFilter}']`);

    let searchInput = document.getElementById("search-museum")    

    if (e.currentTarget.classList.contains('selected')) {
      e.currentTarget.classList.remove('selected');

      itemsToHide = [];
      itemsToShow = document.querySelectorAll('.list-museums [data-filter]');
      searchInput.value = ''
    } else {
      trendings.forEach(el => {
        el.classList.remove('selected')
      })

      e.currentTarget.classList.add('selected')
      searchInput.value = selectedFilter

      // listMuseums.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    searchMuseum()

    if (selectedFilter == 'all') {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll('.list-museums [data-filter]');
    }

    itemsToHide.forEach(el => {
      el.classList.add('hide');
      el.classList.remove('show');
    });

    itemsToShow.forEach(el => {
      el.classList.remove('hide');
      el.classList.add('show'); 
    });
  });
});


// Filter Data Museum
const filters = document.querySelectorAll('.filter-item');

filters.forEach(filter => { 
  filter.addEventListener('click', function(e) {
    let selectedFilter = filter.getAttribute('data-filter');
    let itemsToHide = document.querySelectorAll(`.list-museums .museum-item:not([data-filter='${selectedFilter}'])`);
    let itemsToShow = document.querySelectorAll(`.list-museums [data-filter='${selectedFilter}']`);

    if (e.currentTarget.classList.contains('selected')) {
      e.currentTarget.classList.remove('selected');

      itemsToHide = [];
      itemsToShow = document.querySelectorAll('.list-museums [data-filter]');
    } else {
      filters.forEach(el => {
        el.classList.remove('selected')
      })

      e.currentTarget.classList.add('selected')
    }

    if (selectedFilter == 'all') {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll('.list-museums [data-filter]');
    }

    itemsToHide.forEach(el => {
      el.classList.add('hide');
      el.classList.remove('show');
    });

    itemsToShow.forEach(el => {
      el.classList.remove('hide');
      el.classList.add('show'); 
    });
  });
});



// Variables
const dropdownTime = document.querySelector('#dropdownTime');
const dropdownCategory = document.querySelector('#dropdownCategory');

const body = document.body;

// Functions
const toggleDropdown = (event, element) => {
  event.stopPropagation();
  element.classList.toggle('opened');
};

// const selectOption = (event) => {
//   input.value = event.currentTarget.textContent;
// };

const closeDropdownFromOutside = () => {
  if (dropdownTime.classList.contains('opened')) {
    dropdownTime.classList.remove('opened');
  }

  if (dropdownCategory.classList.contains('opened')) {
    dropdownCategory.classList.remove('opened');
  }
};
// Event Listeners

body.addEventListener('click', closeDropdownFromOutside);

const selectOption = (labelSelected, listOptions) => {
  const label = document.querySelector(labelSelected);
  const listOfOptions = document.querySelectorAll(listOptions);

  listOfOptions.forEach((option) => {
    option.addEventListener('click', () => {
      listOfOptions.forEach(el => {
        el.classList.remove('active')
      })
  
      option.classList.add('active')
      label.textContent = event.currentTarget.firstElementChild.textContent;

      let itemsToHide = document.querySelectorAll(`.list-museums [data-filter]`);
      let itemsToShow = document.querySelectorAll(`.list-museums [data-filter]`);

      itemsToHide.forEach(el => {
        el.classList.add('hide');
        el.classList.remove('show');
      });

      setTimeout(() => {
        itemsToShow.forEach(el => {
          el.classList.remove('hide');
          el.classList.add('show'); 
        });
      }, 150);
    });
  });
}

selectOption('#dropdownTime .labelSelected', '#dropdownTime .option')
selectOption('#dropdownCategory .labelSelected', '#dropdownCategory .option')

dropdownTime.addEventListener('click', (e) => {
  toggleDropdown(e, dropdownTime)
  if (dropdownCategory.classList.contains('opened')) {
    dropdownCategory.classList.remove('opened');
  }
});
//dropdownCategory.addEventListener('click', (e) => {
//  toggleDropdown(e, dropdownCategory)
//  if (dropdownTime.classList.contains('opened')) {
//    dropdownTime.classList.remove('opened');
//  }
//});


// Navigation Drawer
const hamburgerBtn = document.querySelector('.hamburgerBtn');
const navigationDrawer = document.querySelector('.navigationDrawer');
const closeNavigationBtn = document.querySelector('.closeNavigationBtn');

hamburgerBtn.addEventListener('click', (e) => {
  navigationDrawer.classList.add('show')
  e.currentTarget.classList.add('hide')
  closeNavigationBtn.classList.remove('hide')
})

closeNavigationBtn.addEventListener('click', (e) => {
  navigationDrawer.classList.remove('show')
  e.currentTarget.classList.add('hide')
  hamburgerBtn.classList.remove('hide')
})


// ShowAll FilterCategory
const showAllCategory = document.querySelector('.showAllBtn');
const filterCategoryContainer = document.querySelector('.filters-category');

showAllCategory.addEventListener('click', (e) => {
  filterCategoryContainer.classList.add('showAll');
  e.currentTarget.remove();
})


// Swiper Museum Featured
const swiperFeaturedMuseum = new Swiper('.swiper-featured', {
  // Optional parameters
  // direction: 'vertical',
  slidesPerView: 1,
  // spaceBetween: 24,
  loop: true,

  // If we need pagination
  // pagination: {
  //   el: '.swiper-pagination',
  // },

  // Navigation arrows
  navigation: {
    nextEl: '.nextBtn',
    prevEl: '.prevBtn',
  },
  breakpoints: {
    // when window width is >= 320px
    // 320: {
    //   slidesPerView: 1,
    //   spaceBetween: 20
    // },
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 24
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 24
    }
  }

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});


window.onload = function() {
  // Like Button
  const likeMuseumBtn = document.querySelectorAll('.likeBtn')

  likeMuseumBtn.forEach((likeMusuem) => {
    likeMusuem.addEventListener('click', el => {
      if (el.currentTarget.classList.contains('liked')) {
        el.currentTarget.classList.remove('liked')
      } else {
        el.currentTarget.classList.add('liked')
      }
    })
  })
}

const listMuseumClass = document.querySelector('.list-museums')
const increaseThumnailBtn = document.querySelector('.increaseThumnailBtn')
const decreaseThumnailBtn = document.querySelector('.decreaseThumnailBtn')


increaseThumnailBtn.addEventListener('click', () => {
  const thumbnailSize = parseInt(listMuseumClass.getAttribute('data-thumbnail-size'))  
  if(thumbnailSize<6){
    listMuseumClass.classList.remove(`thumbnail-${thumbnailSize}`)
    listMuseumClass.classList.add(`thumbnail-${thumbnailSize+1}`)
    listMuseumClass.setAttribute('data-thumbnail-size', thumbnailSize+1)
  }
})

decreaseThumnailBtn.addEventListener('click', () => {
  const thumbnailSize = parseInt(listMuseumClass.getAttribute('data-thumbnail-size'))
  if(thumbnailSize>1){
    listMuseumClass.classList.remove(`thumbnail-${thumbnailSize}`)
    listMuseumClass.classList.add(`thumbnail-${thumbnailSize-1}`)
    listMuseumClass.setAttribute('data-thumbnail-size', thumbnailSize-1)
  }
})


// Loadmore Button
const loadMoreMuseumBtn = document.querySelector('.loadMoreMuseumBtn')
loadMoreMuseumBtn.addEventListener('click', () => {
  return fetch('data.json')
      .then(response => response.json())
      .then(data => {
        data.slice(0, 3)
          .map(({thumbnail, category, title, like, liked, view, link}, index) => attachMuseum({thumbnail, category, title, like, liked, view, link}))
        loadMoreMuseumBtn.scrollIntoView({ behavior: "smooth", block: "end" });
      })
      .catch(error => console.log(error));
})
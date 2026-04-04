let allMovies = [];

async function loadMovies() {
    const res = await fetch("movies.json");
    allMovies = await res.json();
}

function displayMovies(movies) {
    const container = document.getElementById("movieResults");
    container.innerHTML = "";

    if (movies.length === 0) {
        container.innerHTML = "<p>No movies found 😢</p>";
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
        <div class="movie-box">
            <img src="${movie.poster}" 
            onerror="this.src='https://via.placeholder.com/300x450?text=No+Image'">

            <div class="movie-popup">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.rating}</p>
                <p>📅 ${movie.year}</p>
            </div>
        </div>
        `;

        container.appendChild(card);
    });
}

/* ✅ FINAL FILTER (NO BUG VERSION) */
function recommendMovie() {
    const selectedGenre = document.getElementById("genreSelect").value;

    if (!selectedGenre) return;

    const filtered = allMovies.filter(movie => {
        const g = movie.genre.toLowerCase().trim();

        if (selectedGenre === "Action") {
            return ["action", "adventure", "sci-fi"].includes(g);
        }

        if (selectedGenre === "Romance") {
            return g === "romance";
        }

        if (selectedGenre === "Comedy") {
            return g === "comedy";
        }

        if (selectedGenre === "Horror") {
            return ["horror", "thriller"].includes(g);
        }

        if (selectedGenre === "Drama") {
            return ["drama", "biography", "crime", "mystery"].includes(g);
        }

        if (selectedGenre === "Fantasy") {
            return ["fantasy", "animation", "western", "war"].includes(g);
        }

        return false;
    });

    displayMovies(filtered);

    document.querySelector(".recommendations").scrollIntoView({
        behavior: "smooth"
    });
}

function toggleSearch() {
    const container = document.querySelector(".search-container");
    container.classList.toggle("active");

    if (container.classList.contains("active")) {
        document.getElementById("searchInput").focus();
    }
}

/* ✅ LOAD DATA PROPERLY */
document.addEventListener("DOMContentLoaded", async () => {

    await loadMovies(); // 🔥 ensures movies loaded before filtering

    document.getElementById("searchInput").addEventListener("input", e => {
        const val = e.target.value.toLowerCase();

        const filtered = allMovies.filter(m =>
            m.title.toLowerCase().includes(val)
        );

        displayMovies(filtered);
    });

});
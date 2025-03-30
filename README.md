# Hoppy To Be-Er | Breweries Demo

Hoppy To Be-Er is a Vue 3-based demo application for discovering breweries and exploring detailed information about them. This demo implements key features such as search functionality, pagination, and dynamic routing for exploring brewery details.

![Hoppy Logo](src/assets/beer-mug.svg)

## Features

### 1. Search Breweries
- A **search bar** allows users to search breweries by name.
- Instant updates on search queries followed by new results.

### 2. Paginated List of Breweries
- Breweries are displayed in a paginated list.
- Navigation between pages updates the results dynamically using the router.

### 3. Brewery Details
- Detailed information about a selected brewery, such as:
    - Type of brewery
    - Location (address, city, state, postal code)
    - Official website (if available)
- Metadata for brewery details dynamically updates the page title and description.

### 4. Routing and Navigation
- **Home Page**: Displays the brewer list with options to search and paginate.
- **Details Page**: Displays detailed data for a selected brewery via dynamic route parameters.
- **Redirect for Undefined Routes**: Friendly user flow for invalid URLs, redirecting back to the Home Page.

---

## Installation and Setup

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) and npm installed.

### Steps to Setup
1. Clone the repository:
```shell script
git clone git@github.com:sgassama/brewhaus-demo.git
   cd brewhaus-demo
```

2. Install dependencies:
```shell script
npm install
```

3. Create a `.env` file to set your API base URL:
```
VITE_BREWERIES_API_BASE_URL=https://api.openbrewerydb.org/breweries
```

4. Run the app:
```shell script
npm run dev
```

5. Access the app locally:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

### Key Directories and Files
- **`src/components`**: Reusable Vue components:
    - `SearchBar.vue`: Search input for brewery names.
    - `Pagination.vue`: Navigate between brewery pages.
    - `BreweryList.vue`: Paginated list of breweries.
- **`src/views`**: Pages rendered by routes:
    - `HomePage.vue`: Displays a summary of breweries.
    - `DetailsPage.vue`: Shows brewery details.
- **`src/router`**: Application routes (`router.ts`).
- **`src/services`**: API-related utilities:
    - `api.ts`: Fetch brewery data from an external REST API.
- **`src/assets`**: Static assets like images.

---

## Core Dependencies

The following libraries power the application:

| Package               | Version    | Purpose                                           |
|-----------------------|------------|---------------------------------------------------|
| `vue`                | `^3.5.13`  | Core framework for building the app.             |
| `vue-router`         | `^4.5.0`   | Handles navigation and dynamic routing.          |
| `axios`              | `^1.8.4`   | Used for HTTP requests to fetch API data.        |
| `@vueuse/head`       | `^2.0.0`   | Manage dynamic metadata for pages.               |
| `vite`               | `^6.2.0`   | Dev server and build tool for Vue 3.             |
| `typescript`         | `~5.7.2`   | Type-checking and better developer experience.   |

---

## Usage

1. **Search Breweries**:
    - Use the search bar on the home page to look for breweries by name.

2. **Pagination**:
    - Navigate between pages using the `Prev` and `Next` buttons.

3. **Explore Details**:
    - Click on a brewery’s name to view its details.

4. **Dynamic Routing**:
    - URLs update dynamically to include query parameters for the search and pagination.

---

## Development Scripts

| Script            | Purpose                                     |
|--------------------|---------------------------------------------|
| `npm run dev`     | Run the development server.                |
| `npm run build`   | Compile the TypeScript and build the app.  |
| `npm run preview` | Preview the production build.              |
| `npm run test`    | Run the tests using `vitest`.              |

---

## Testing
The app includes a test setup using:
- **`@testing-library/vue`**: For Vue component testing.
- **`vitest`**: A fast unit-testing framework.

To run tests:
```shell script
npm run test
```

---

## API Reference
This app uses the Open Brewery API for all brewery-related data. For more details, visit their [API Documentation](https://www.openbrewerydb.org/documentation).

---

## License
This is a demo project and is for personal or educational purposes only.

Enjoy discovering breweries with **Hoppy To Be-Er**! 🍺

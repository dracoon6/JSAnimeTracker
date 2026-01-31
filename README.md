# Overview

As a software engineer, I built the Anime Tracker to deepen my understanding of core JavaScript concepts and modern web development practices. This project demonstrates practical application of asynchronous programming, data persistence, and API integration—skills essential for full-stack development.

The Anime Tracker is a web application designed to help users manage and discover anime and manga titles. The application features a responsive grid layout for displaying collections, real-time search functionality powered by the Jikan API, local data persistence using the browser's Local Storage API, and an intuitive form system for adding new titles. Users can filter their collection by media type, view detailed information through interactive modals, and maintain their personal ratings and watch statuses across browser sessions.

My purpose for writing this software was to develop a comprehensive understanding of vanilla JavaScript fundamentals while building a practical, real-world application. Through this project, I focused on mastering DOM manipulation, asynchronous data fetching with Fetch API and async/await, effective use of array methods for data filtering and transformation, and designing responsive user interfaces without relying on external frameworks. This experience has solidified my foundational knowledge of JavaScript and prepared me for more advanced web development concepts.

[Software Demo Video](https://youtube.com/your-video-link-here)
[Website Link](https://dracoon6.github.io/JSAnimeTracker/index.html)
# Development Environment

I developed this software using Visual Studio Code as my primary code editor, with Git for version control throughout the development process. The project runs entirely in modern web browsers with no backend server required, making it lightweight and easy to deploy.

The application is built with vanilla JavaScript (ES6+), HTML5, and CSS3. I utilized the Fetch API for asynchronous HTTP requests to the Jikan API (an unofficial MyAnimeList API), which provided real-time anime data without requiring authentication. For data persistence, I leveraged the browser's Local Storage API to maintain user collections between sessions. The architecture follows object-oriented programming principles with a dedicated StorageManager class to handle all data operations, promoting code organization and reusability.

# Useful Websites

- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Web Docs - Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Jikan API Documentation](https://jikan.moe/)
- [MDN Web Docs - Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [CSS Grid Layout Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [JavaScript Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)

# Future Work

- Implement user authentication and backend database for multi-user support
- Add advanced filtering options including genre, rating range, and air date
- Create data export functionality to download collection as JSON or CSV
- Implement anime recommendations based on user ratings and watch history
- Add dark/light theme toggle with preference persistence
- Integrate additional anime APIs for richer data and cover images
- Create mobile-native versions using React Native or Flutter
- Add social features allowing users to share collections and recommendations

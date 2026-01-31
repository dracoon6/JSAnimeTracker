# Anime Tracker

## Overview

As a software engineer, I'm building this project to deepen my understanding of core JavaScript concepts and modern web development practices. I want to master asynchronous programming, data persistence, API integration, and DOM manipulation—skills that will make me a more effective full-stack developer.

The Anime Tracker is a web application that helps users manage and discover anime and manga titles. It features a responsive grid layout for browsing collections, real-time search functionality powered by the Jikan API, local data persistence using browser storage, and an intuitive form system for adding new titles. Users can filter their collection by media type (TV, Movie, Manga), view detailed information through interactive modals, and maintain their personal ratings and watch statuses across browser sessions—all without needing a backend server.

My purpose for writing this software is to develop a comprehensive understanding of vanilla JavaScript fundamentals while building something practical and real-world. Through this project, I focused on mastering DOM manipulation, asynchronous data fetching with Fetch API and async/await, effective use of ES6 array methods for data filtering and transformation, recursive functions for complex data operations, and designing responsive user interfaces without relying on external frameworks. By completing this project, I've solidified my foundational knowledge of JavaScript and prepared myself for more advanced web development concepts.

[Software Demo Video](https://youtu.be/-odVl5m-O3c)
[Website Link](https://dracoon6.github.io/JSAnimeTracker/index.html)

## Development Environment

I developed this software using Visual Studio Code as my primary code editor, with Git for version control. The application runs entirely in modern web browsers with no backend server required, making it lightweight and easy to deploy as a static website.

The application is built with vanilla JavaScript (ES6+), HTML5, and CSS3. The primary technologies and libraries I used include:

- **Jikan API** - An unofficial MyAnimeList REST API that provides real-time anime and manga data without requiring authentication
- **Fetch API** - For asynchronous HTTP requests to the Jikan API
- **Local Storage API** - For persistent client-side data storage across browser sessions
- **ES6+ JavaScript Features** - Including arrow functions, template literals, destructuring, async/await, and array methods (map, filter, reduce, forEach)
- **Recursion** - Custom recursive functions for deep object cloning and tree traversal
- **CSS3** - With Grid layouts, Flexbox, and media queries for responsive design
- **Object-Oriented Programming** - StorageManager class for centralized data management with custom error handling

## Useful Websites

- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Web Docs - Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN Web Docs - Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN Web Docs - Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
- [MDN Web Docs - Recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)
- [Jikan API Documentation](https://jikan.moe/)
- [CSS Grid Layout Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

## Future Work

- Implement user authentication with a backend database for multi-user support and account persistence
- Add advanced filtering options including anime genre, rating range, air date, and seasonal filters
- Create data export functionality allowing users to download their collection as JSON or CSV files
- Implement a recommendation system based on user ratings and watch history patterns
- Add a dark/light theme toggle with preference persistence across sessions
- Integrate additional anime APIs to provide richer data and more cover image sources
- Build a mobile-native version using React Native or Flutter for iOS and Android
- Add social features allowing users to share collections and recommendations with friends
- Implement comprehensive unit and integration testing with Jest
- Migrate to TypeScript for better type safety and developer experience
- Convert to a Progressive Web App (PWA) to enable offline functionality
- Add sorting capabilities (alphabetical, by rating, by date added) for better collection management

**Last Updated:** January 31, 2026

**Developer:** [Your Name]

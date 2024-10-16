# LSDrugs - Psychoactive Substances Awareness Website

**LSDrugs** is a website designed to raise awareness about psychoactive substances and drugs, created as part of the **Zwolnieni z Teorii** competition. The site includes numerous articles on various substances, aiming to educate the public and reduce harm through better knowledge.

## Live Site

Visit the website here: [LSDrugs](https://lsdrugs.pl)

## Purpose

The purpose of LSDrugs is to provide scientifically accurate, accessible information about psychoactive substances, including their effects, risks, and safety measures. The website is structured with an easy-to-use content management system (CMS) allowing the project team to continuously update and expand the content.

## Key Features

- **Custom CMS**: Built to allow easy addition and management of articles.
- **Educational Articles**: Focused on psychoactive substances, aiming to increase public awareness and understanding.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## Technologies Used

- **Node.js + Express**: Backend for handling server requests and the CMS.
- **Handlebars (hbs)**: Templating engine used for rendering dynamic content.
- **SCSS**: Used for styling the website with modern, maintainable CSS.
- **Webpack + Gulp**: For bundling JavaScript and compiling styles.
- **Nodemon**: For automatic server restarts during development.

## Installation

To run the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd zwzt-competition-master
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npx nodemon server.js
   ```

4. To compile SCSS styles, run:
   ```bash
   npx gulp
   ```

5. To bundle JavaScript files, run:
   ```bash
   npm run build-js
   ```

## Folder Structure

- **controllers/**: Backend controllers for managing content and requests.
- **views/**: Handlebars templates used for rendering the frontend.
- **scss/**: Stylesheets written in SCSS, compiled using Gulp.
- **static/**: Static files such as images, JavaScript, and CSS.
- **server.js**: The main server file, responsible for starting the Express server.

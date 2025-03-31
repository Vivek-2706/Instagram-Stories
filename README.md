# Instagram-Stories

Instructions for Setting Up and Running the Application & Tests

1. Clone the repository
git clone <!-- Repo path -->
cd instagram-Stories-clone

2. Install dependencies (Make sure you have a minimum of node 18)
npm install

3, Start the app
npm run dev

The app should now be running at http://localhost:5173

Running Tests
npm install -D playwright @playwright/test
npx playwright install
npx playwright test

Design Choices: Performance and Scalability

1. Design Structure

I broke down the app in small components:
StoryList: To load the thumbnails.
StoryViewer: Handles the transition and story viewing
App: Main app to handle the global logic

2. Performance

Lazy Story Loading: Loading the story only when clicked, also using placeholder service for smaller images.
Transition Effects: smooth transition with pure CSS


3. Scalability
I have loaded images in a stories.ts file, so we can either add more images or use API if required.


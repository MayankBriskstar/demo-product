PRODUCT HUB - SETUP AND TEST GUIDE

PREREQUISITES
Step 1: Make sure you have .NET 9 installed on your computer.
Step 2: Make sure you have Node.js installed for the frontend.

HOW TO START THE API (BACKEND)
Step 3: Open your terminal and go to the folder d:\Project\DemoProduct\productapi
Step 4: Type the command: dotnet run
Step 5: Leave this terminal open. Look for the message that says http://localhost:5228

HOW TO START THE FRONTEND (UI)
Step 6: Open a second terminal and go to the folder d:\Project\DemoProduct\productfrontend
Step 7: Type the command: npm install (you only need to do this once)
Step 8: Type the command: npm run dev
Step 9: Open your browser and go to http://localhost:5173 (or the port shown in the terminal)

TESTING THE WEBSITE (NEW PROFESSIONAL UI)
Step 10: You will see the new "Product Hub Login" page.
Step 11: Login using Username: admin and Password: password123.
Step 12: You will be redirected to the "Product Inventory" dashboard (/products).
Step 13: Use the Sidebar to click on "New Product".
Step 14: Enter a Name and Price. Choose a color from the professional "Color Dropdown". Click Save.
Step 15: You will be sent back to the List. Use the "Filter by Color" dropdown at the top right to filter.
Step 16: Click the "Logout" button at the top right header to finish.

TESTING WITH SWAGGER
Step 17: Open http://localhost:5228/swagger/index.html in your browser.
Step 18: Go to /api/auth/login, click Try it out, enter the username/password and click Execute.
Step 19: Copy the token from the result.
Step 20: Click the Authorize button at the top of the page.
Step 21: Type the word Bearer followed by a space and then paste your token.
Step 22: Click Authorize and then Close.
Step 23: Go to /api/products, click Try it out and Execute to see the product list.

RUNNING AUTOMATED TESTS
Step 24: Open a terminal in the main folder d:\Project\DemoProduct
Step 25: Type the command: dotnet test
Step 26: Check that it says Passed! Total: 4

CREDENTIALS
Username: admin
Password: password123

Note: This project stores data in memory. If you stop the API program, the products you added will be gone next time you start it.

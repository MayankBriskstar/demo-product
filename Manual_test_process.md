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
Step 9: Open your browser and go to http://localhost:5173

TESTING THE WEBSITE
Step 10: Login using Username: admin and Password: password123
Step 11: On the product list, look at the products already there.
Step 12: Click the Add New button. Enter a name, price, and any color like Green. Click Save.
Step 13: Go back to the List and see if your new product is there.
Step 14: Use the color filter dropdown to choose the color you added.
Step 15: Click Logout at the top right to finish.

TESTING WITH SWAGGER
Step 16: Open http://localhost:5228/swagger/index.html in your browser.
Step 17: Go to /api/auth/login, click Try it out, enter the username/password and click Execute.
Step 18: Copy the token from the result.
Step 19: Click the Authorize button at the top of the page.
Step 20: Type the word Bearer followed by a space and then paste your token. It should look like this: Bearer ey...
Step 21: Click Authorize and then Close.
Step 22: Go to /api/products, click Try it out and Execute to see the product list.

RUNNING AUTOMATED TESTS
Step 23: Open a terminal in the main folder d:\Project\DemoProduct
Step 24: Type the command: dotnet test
Step 25: Check that it says Passed! Total: 4

CREDENTIALS
Username: admin
Password: password123

Note: This project stores data in memory. If you stop the API program, the products you added will be gone next time you start it.

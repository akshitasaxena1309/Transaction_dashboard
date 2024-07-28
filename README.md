# Transactions Dashboard
This project is a transactions dashboard that displays various data visualizations related to product transactions. It fetches data from a third-party API, processes it, and provides multiple APIs for different analyses, including transaction listings, statistics, and visualizations.1
## Table of Contents
-Features
-Installation
-Usage
-API Endpoints
-Components
-Technologies Used
-Contributing
-License

## Features
-Transaction Table: Displays a paginated list of product transactions, with search functionality by title, description, or price.
-Transaction Statistics: Shows total sales amount, total sold items, and total unsold items for a selected month.
-Bar Chart Visualization: Visualizes the number of items in various price ranges for a selected month.
-Pie Chart Visualization: Displays the number of items per category for a selected month.

## Usage
Once the server is running, you can access the dashboard at http://localhost:3000 and perform the following actions:

-Use the dropdown to select a month and view data specific to that month.
-Search transactions by entering a keyword in the search box.
-Navigate through pages of transactions using the Next and Previous buttons.
-View statistics and charts that update according to the selected month.


## API Endpoints
The backend provides several APIs for fetching and analyzing transaction data. All endpoints expect a month parameter, which can be any value from "January" to "December".

1. Initialize Database
GET /api/initialize

Fetches data from the third-party API and initializes the database.

2. List Transactions
GET /api/transactions

Parameters:
month (required): Month for which to fetch transactions.
search (optional): Search query for product title, description, or price.
page (optional): Page number for pagination (default: 1).
perPage (optional): Number of records per page (default: 10).

3. Get Statistics
GET /api/transactions/statistics

Parameters:
month (required): Month for which to fetch statistics.
Returns:

Total sale amount
Total number of sold items
Total number of unsold items

4. Bar Chart Data
GET /api/transactions/bar-chart

Parameters:
month (required): Month for which to fetch bar chart data.
Returns:

Number of items in each price range (0-100, 101-200, ..., 901+)

5. Pie Chart Data
GET /api/transactions/pie-chart

Parameters:
month (required): Month for which to fetch pie chart data.
Returns:
Number of items per unique category

6. Combined Data
GET /api/transactions/combined

Fetches data from all the above APIs and returns a combined response.



# Components
## Frontend Components
TransactionTable.js: Displays a searchable and paginated list of transactions.
TransactionStatistics.js: Displays total sales, sold items, and unsold items for a selected month.
TransactionsBarChart.js: Renders a bar chart showing item counts by price range.
TransactionsPieChart.js: Renders a pie chart showing item distribution by category.

## Backend Structure
/models: Contains Mongoose models for transaction data.
/routes: Defines API endpoints and their handlers.
/controllers: Contains logic for processing API requests and interacting with the database.
/utils: Utility functions for data processing and handling.

# Technologies Used
## Frontend:

React.js
Chart.js
Axios
CSS (for styling)

## Backend:

Node.js
Express.js
MongoDB
Mongoose

## Contributing
Contributions are welcome! If you have suggestions or improvements, please create an issue or submit a pull request.

Fork the repository.
- Create a new branch: git checkout -b feature/my-feature.
- Make your changes and commit them: git commit -m 'Add new feature'.
- Push to the branch: git push origin feature/my-feature.
- Submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

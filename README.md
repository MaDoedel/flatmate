# Flatmates Expense Visualizer

**Flatmates Expense Visualizer** is a web-based tool designed to help flatmates easily visualize and calculate the price per area per flatmate, as well as manage shared expenses that can be evenly split among all flatmates. This tool simplifies the process of tracking expenses and ensures that everyone knows what they need to pay at the end of the month.

## Features

- **Area-Based Cost Visualization**: Calculate and display the price per square meter for each flatmate based on the total area of the apartment and each flatmate's allocated space.
- **Add and Split Expenses**: Easily add shared expenses (e.g., utilities, internet, groceries) and automatically split them evenly among all flatmates.
- **User Management**: Add or remove flatmates dynamically to reflect the current household situation.
- **Real-Time Updates**: All calculations and updates are performed in real-time, providing immediate feedback on how changes affect individual and shared expenses.

## Getting Started

### Installation

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:MaDoedel/flatmate.git
   ```
   
2. **Navigate to the Project Directory**:
   ```bash
   cd flatmate
   ```
   
3. **Install Dependencies**:
   ```bash
   npm install
   ```
   
### Running the Application

To start the development server, run the following command:

```bash
npm run develop
```

This will start the application on [http://localhost:8000](http://localhost:8000). Open this link in your browser to view the application.

### Usage

1. **Set Up the Initial Users**: On the main dashboard, add each flatmate by entering their name and clicking the 'Add' button.
   
2. **Assign Area to Each Flatmate**: For each flatmate, input the amount of space (in square meters) they occupy. The tool will automatically calculate and display the price per area for each person.

3. **Add Shared Expenses**: Use the "Add Expense" button to input any shared costs such as rent, utilities, or groceries. The total expense will be split evenly among all flatmates.

4. **View Summary**: The summary section at the bottom of the page provides an overview of each flatmate’s share of the expenses and the total amount they need to pay.

### Built With

- **React**: A JavaScript library for building user interfaces.
- **Bootstrap**: A front-end framework for developing responsive and mobile-first websites.
- **JavaScript**: The primary programming language used to develop the application logic.
- **HTML/CSS**: For structuring and styling the application.


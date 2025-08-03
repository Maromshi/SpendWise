# SpendWise - Smart Budget Management System

SpendWise is a modern, bilingual (Hebrew/English) budget management application that helps users track their expenses and income efficiently. Built with React for the frontend and Node.js for the backend, it provides a user-friendly interface with advanced visualization features.

## Features

- 🌐 **Bilingual Support**: Full Hebrew and English language support
- 📊 **Advanced Dashboard**:
  - Monthly income/expenses bar chart
  - Category distribution pie chart
- 💰 **Budget Management**:
  - Track monthly budget
  - Real-time budget usage monitoring
  - Smart tips based on spending patterns
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔐 **Secure Authentication**: JWT-based user authentication
- 📈 **Transaction Management**:
  - Add/Edit/Delete transactions
  - Categorize expenses and income
  - Multiple payment methods support

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Recharts for data visualization
- Context API for state management
- Axios for API calls

### Backend

- Node.js
- Express
- MongoDB
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Maromshi/SpendWise.git
cd SpendWise
```

2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
   Create a `.env` file in the backend directory with:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4000
```

4. Run the application:

```bash
# Run backend (from backend directory)
npm start

# Run frontend (from frontend directory)
npm run dev
```

## Features in Detail

### Dashboard

- **Monthly Summary**: Bar chart showing income vs expenses by month
- **Category Distribution**: Pie chart displaying expense distribution across categories

### Budget Management

- Set and adjust monthly budgets
- Real-time tracking of expenses
- Visual indicators for budget usage
- Smart recommendations based on spending patterns

### Transaction Management

- Add new transactions with categories
- Support for various payment methods
- Edit and delete existing transactions
- Filter and sort transactions

### Multilingual Support

- Toggle between Hebrew and English
- Full RTL support for Hebrew
- Consistent date and number formatting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# SpendWise - Smart Budget Management System

SpendWise is a modern, bilingual (Hebrew/English) budget management application that helps users track their expenses and income efficiently. Built with React for the frontend and Node.js for the backend, it provides a user-friendly interface with advanced visualization features.

## Features

- 🌐 **Bilingual Support**: Full Hebrew and English language support
- 📊 **Advanced Dashboard**:
  - Monthly income/expenses bar chart.
  - Category distribution pie chart.
- 💰 **Budget Management**:
  - Track monthly budget
  - Real-time budget usage monitoring
  - Smart tips based on spending patterns
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔐 **Secure Authentication**: JWT-based user authentication
- 📈 **Transaction Management**:
  - Add/Edit/Delete transactions
  - Categorize expenses and income
  - Multiple payment methods support

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Recharts for data visualization
- Context API for state management
- Axios for API calls

### Backend

- Node.js
- Express
- MongoDB
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Maromshi/SpendWise.git
cd SpendWise
```

2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
   Create a `.env` file in the backend directory with:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4000
```

4. Run the application:

```bash
# Run backend (from backend directory)
npm start

# Run frontend (from frontend directory)
npm run dev
```

## Features in Detail

### Dashboard

- **Monthly Summary**: Bar chart showing income vs expenses by month
- **Category Distribution**: Pie chart displaying expense distribution across categories

### Budget Management

- Set and adjust monthly budgets
- Real-time tracking of expenses
- Visual indicators for budget usage
- Smart recommendations based on spending patterns

### Transaction Management

- Add new transactions with categories
- Support for various payment methods
- Edit and delete existing transactions
- Filter and sort transactions

### Multilingual Support

- Toggle between Hebrew and English
- Full RTL support for Hebrew
- Consistent date and number formatting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

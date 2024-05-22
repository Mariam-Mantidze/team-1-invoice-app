# Invoice Management Application

## Overview

This project is an Invoice Management Application built with React. It provides functionality to create, edit, and manage invoices. The application communicates with a backend API to fetch and store invoice data. It features dynamic forms, form validation using react-hook-form and yup, modals for user interactions, and responsive design to adapt to different screen sizes.

## Features

- Invoice Management: Create, edit, and delete invoices.
- Dynamic Forms: Add and remove invoice items dynamically.
- Form Validation: Validate forms using react-hook-form and yup.
- Modals: Display success and discard modals.
- Dark and Light Modes: Toggle between dark and light themes.
- Responsive Design: Render different components based on screen size.
- Backend Integration: Fetch and store data using a backend API.
- Context and Routing: Manage global state with useContext and navigate using react-router-dom.

## Working with Backend

### Fetching Data

To fetch invoice data from the backend, we use the fetch API. Here’s an example function that retrieves data from the server:

```
async function getData() {
  try {
    const response = await fetch("https://invoice-api-team-1.onrender.com/api/invoice/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
```

### Adding an Invoice

To add a new invoice, we send a POST request to the backend. The status of the invoice determines the endpoint used:

````
if (finalData.status === "draft") {
  try {
    const response = await fetch(`https://invoice-api-team-1.onrender.com/api/invoice/draft/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
    ```
    ```
try {
const response = await fetch(`https://invoice-api-team-1.onrender.com/api/invoice/`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(finalData),
});
}
}
}
````

## Working with Complex Forms

### Dynamic Input Fields

One of the key features of this application is the ability to add dynamic input fields for invoice items. Here’s how we handle adding a new item:

```
const handleAddItemClick = (e) => {
  e.preventDefault();
  const newItem = {
    id: uuid(),
    name: "",
    quantity: 0,
    price: 0,
    total: 0,
  };

  setItems([...items, newItem]);
};
```

### Custom Fields and Calculations

We also perform calculations for each item and update the form data accordingly. Here’s an example of calculating the total for each item:

```
const itemsWithTotals = itemsValues.map((item) => ({
  ...item,
  total: ((item.quantity || 0) * (item.price || 0)).toFixed(2),
  price: (+item.price || 0).toFixed(2),
  quantity: (+item.quantity || 0).toFixed(2),
  id: item.id,
}));
```

### Modals

Modals are used to provide feedback to the user, such as success messages or discard confirmations. Here’s how we manage the modals:

```
const [modalIsOpen, setModalIsOpen] = useState(false);
const [discardDialogue, setDiscardDialogue] = useState(false);

// Function to open the success modal
setModalIsOpen(true);

// Function to close the success modal after some time
setTimeout(() => {
  setModalIsOpen(false);
  navigate("/");
}, 3000);
```

## Dark and Light Modes

Using styled-components and Tailwind, we can easily toggle between dark and light themes:

```
<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
  <App />
</ThemeProvider>
```

## Responsive Design

We use a custom hook, useWindowSize, to determine the screen size and render different components accordingly:

```
import { useWindowSize } from "./hooks/useWindowSize";

const { isMobile } = useWindowSize();

<Routes>
  <Route path="/:id" element={<SingleInvoice />} />
  {isMobile ? (
    <Route path="/new-invoice" element={<NewInvoice />} />
  ) : (
    <Route path="/" element={<Navigate to="/" />} />
  )}
</Routes>
```

## Challenges and Learnings

Building this application involved several challenges and learnings:

- Dynamic Forms: Managing dynamic input fields and form validation was a key learning experience.
- Form Validation: Implementing react-hook-form with yup for complex nested validation helped ensure data integrity.
- Modals: Creating and managing modal states to enhance user interaction required careful state management.
- Responsive Design: Ensuring the application was responsive and provided a good user experience across different devices was crucial.
- Backend Integration: Handling asynchronous data fetching and error management was essential for a seamless user experience.

### Links

- Solution URL: [Github Pages](https://team-1-invoice-app.vercel.app/)

# Getting Started

Prerequisites

- Node.js and npm installed
- Basic understanding of React

## Installation

### Clone the repository:

```
git clone https://github.com/your-repo/invoice-management-app.git
```

### Install dependencies:

```
cd invoice-management-app
npm install
```

### Running the Application

Start the development server:

```
npm start
```

### Useful resources

- [React Hook-Forms Documendation](https://react-hook-form.com/get-started)

Thank you for using the Invoice Management Application! If you have any questions or feedback, feel free to open an issue or reach out.

# Stock Data Visualization Web Application

## Overview

This project is a simple web application built with ReactJS for the frontend and Django for the backend. The application visualizes stock data from a provided JSON file, which is loaded into an SQL database (`db.sqlite3`). The application is deployed with the frontend on Netlify and the backend on PythonAnywhere. 

## Features

1. **Table Visualization**:
    - The home page displays the stock data in a table format.
    - Table rows are editable, allowing users to update the data directly from the frontend.
    - Pagination is implemented to manage large datasets, displaying 5 rows per page.

2. **CRUD Operations**:
    - Users can perform Create, Read, Update, and Delete (CRUD) operations on the stock data.

3. **Line and Bar Chart Visualization**:
    - A line chart above the table visualizes the 'close' column data over time (date on the x-axis).
    - An additional bar chart visualizes the 'volume' column data.
    - Both charts are combined using a multi-axis chart.
    - A dropdown menu allows users to filter the chart data by `trade_code`.

4. **Additional Data Visualization**:
    - An extra dropdown menu is added to allow users to select and visualize other columns (High, Low, Open) in the chart.
    - This provides a more comprehensive view of the stock data.

## Deployment

- **Frontend**: Deployed on Netlify.
- **Backend**: Deployed on PythonAnywhere.

## Getting Started

### Prerequisites

- Node.js
- Python 3.x
- Django
- SQLite3

### Installation

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2. **Backend Setup**:
    - Navigate to the backend directory:
        ```bash
        cd Backend
        ```
    - Create a virtual environment and activate it:
        ```bash
        myenv\Scripts\activate
       
        ```
    - Install the required dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    - Run the Django migrations to set up the database:
        ```bash
        python manage.py migrate
        ```
    - Start the Django development server:
        ```bash
        cd .\myproject\
        python manage.py runserver
        ```

3. **Frontend Setup**:
    - Navigate to the frontend directory:
        ```bash
        cd Frontend
        ```
    - Navigate to the frontend directory:
        ```bash
        cd React-crud-app
        ```
    - Install the required dependencies:
        ```bash
        npm install
        ```
    - Start the React development server:
        ```bash
        npm start
        ```

### Usage

- Access the web application at `http://localhost:3000` to view the table and chart visualizations.
- Use the dropdown menus to filter and visualize the data as needed.
- Edit table rows to update the stock data.

Certainly! Here's an updated section on Challenges and Learning that reflects your experience with React, Django, project deployment, and learning new technologies:

### Challenges and Learning

#### Challenges

1. **Learning React and Django**:
   - Being new to ReactJS and Django posed significant challenges in understanding their architectures and integrating them effectively.
   - Overcoming the learning curve of two new technologies simultaneously while aiming to deliver a functional project within a short timeframe was particularly challenging.

2. **Project Deployment**:
   - Deploying the application on cloud platforms such as Netlify for the frontend and PythonAnywhere for the backend was a novel experience.
   - Configuring deployment settings, managing environment variables, and ensuring the application runs smoothly in a production environment required learning new deployment techniques.

#### Learning

- **Website Deployment**:
  - Acquired hands-on experience in deploying web applications on cloud platforms like Netlify and PythonAnywhere.
  - Learned about managing environments, setting up continuous deployment pipelines, and handling deployment-related issues.

- **React and Django Technologies**:
  - Gained proficiency in ReactJS for building interactive user interfaces and managing state efficiently.
  - Developed skills in Django for creating a robust backend, handling data models, implementing CRUD operations, and managing API endpoints.

- **Building a CRUD Application**:
  - Implemented CRUD functionalities using ReactJS and Django, understanding how frontend components interact with backend APIs.
  - Learned best practices for data management, validation, and security in a web application context.

- **Adaptability and Problem-Solving**:
  - Enhanced adaptability by quickly learning and applying new concepts such as data visualization using Chart.js and integrating third-party libraries for enhanced functionality.
  - Developed problem-solving skills by resolving challenges related to data integration, visualization, and user interaction in the application.


## Contact

For any questions or issues, please contact me at:
- Name: Emam Hasan
- Email: ehasan201302@bscse.uiu.ac.bd
- Phone: +8801863703256

## Links

- **GitHub Repository**: [https://github.com/foyez-hub/JanataWifiProject]
- **Live Application**: [https://66698b4b4ca94d0e78f23bc9--rainbow-sunburst-215da2.netlify.app/]


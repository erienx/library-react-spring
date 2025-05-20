# Introduction

A web application created using React + Spring Boot and PostgreSQL database. It allows user to view available books with ease, and in a variety of ways, as well as add books to cart and commit orders among many. Website support english and polish languages. A more detailed showcase below.


# Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

* Make sure you have the following installed:

* Node.js (v14 or later)

* npm or yarn

* Java JDK (11 or later)

* PostgreSQL

* Maven

## 1. Clone the Repository

```
git clone https://github.com/erienx/library-react-spring.git
cd library-react-spring
```

## 2. Set up the PostgreSQL Database
* Open your PostgreSQL client and create the library database:
```
CREATE DATABASE library;
```
* Load the sample schema/data from the provided SQL file:
```
psql -U postgres -d library -f library.sql
```
Default credentials used are: username: "postgres", password: "postgres"

## 3. Start the Backend
Navigate to the backend folder and run the Spring Boot app:
```
cd backend
./mvnw spring-boot:run
```
Above will result on backend launching on http://localhost:8080

##4. Start the Frontend
In a new terminal, start the React frontend:
```
cd frontend
npm i
npm run dev
```
Above will result on frontend launching on http://localhost:5173/

# Showcase

### Home page

![image](https://github.com/user-attachments/assets/2a0c7404-c49e-4945-9d39-542bdb4b5bad)
![image](https://github.com/user-attachments/assets/f75abf5e-32b3-4027-a01e-de3cdfab920b)


Home page contains a search bar, which if left empty, will display all the books in the database (paginated) which can be sorted in a variety of ways. You may enter book title in the search bar causing the program to refetch books (after 1 second) that contain said text.

### Additional search pages
![image](https://github.com/user-attachments/assets/bcf70b3c-e038-4b43-9032-fd842f1151ea)
You may search for a book based on author (or publisher) by going over to pages from the lower header.

### Book details
![image](https://github.com/user-attachments/assets/265f27ed-ab96-487e-b088-27c2ce0e9462)


### Register/login
![image](https://github.com/user-attachments/assets/79141b2e-69ef-40bf-b622-67df2363acab)
![image](https://github.com/user-attachments/assets/336b2a58-5ad8-48a7-9457-7c1f6f463383)
Upon logging in users (or admin) get access to a variety of functionalities.

### Cart
![image](https://github.com/user-attachments/assets/9d14c0c6-792c-402c-b5ac-894d2fb98969)
After adding item(s) to cart you have an option to commit order.
![image](https://github.com/user-attachments/assets/a210e4d2-fd9e-4915-bc15-3c2db3b5ad27)
This makes it visible to the admin at the store where he can proccess it.

### Manage orders (admin)
![image](https://github.com/user-attachments/assets/562331a6-b19a-4dde-8339-1a62427e7791)
Admin may search for a user three different ways as shown above.
After selecing a user website redirects to that user's orders, where they can be forwarded (moved onto another state [pending, rented, completed])
![image](https://github.com/user-attachments/assets/e4927985-555a-45f7-94b1-e35ee19a8e7a)

### Add a book (admin)
![image](https://github.com/user-attachments/assets/ddbf4bd4-1177-46de-b04a-f51a6ac52a07)
Adding a book is easy and intuitive, fields such as author, publisher or category will fetch the data containg the words entered eg. so that no two same categories get created unnecessarily.
![image](https://github.com/user-attachments/assets/bbfde7af-0fb1-4b35-bb41-5edfd75d9300)











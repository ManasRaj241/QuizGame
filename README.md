# Quiz App Backend (Spring Boot Skeleton)

This is the **backend skeleton** for the Quiz App built with **Spring Boot**.  
Currently, it contains a minimal setup with Swagger UI and a sample controller to test APIs.  

---

## 🚀 Tech Stack
- **Java 21**
- **Spring Boot 3.5.5**
- **Gradle**
- **Spring Web**
- **Spring Data JPA** (DB integration placeholder)
- **PostgreSQL Driver**
- **Lombok**
- **Springdoc OpenAPI (Swagger UI)**

---

## ⚙️ Setup Instructions

### 1️ : Clone the repository
```
git clone https://github.com/ManasRaj241/QuizGame.git
cd quiz-app-backend
docker-compose up -d
docker ps
```

### 2️ : Build the project
```
./gradlew clean build
```

### 3️ : Run the application
```
./gradlew bootRun
```

### 4️ : Access Swagger UI
After starting the app, open:  
👉 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

You will see all the available APIs.

---

## 📌 Example Controller

Currently, the project has a sample `QuizController` with in-memory data.

**Endpoints:**
* `GET /api/quizzes` → Get all quizzes  
* `GET /api/quizzes/{id}` → Get a quiz by ID  
* `POST /api/quizzes` → Create a new quiz  
* `DELETE /api/quizzes/{id}` → Delete a quiz  

---

## ✅ Current Status

This project is a **skeleton** with:
* Swagger UI working  
* A sample REST Controller  
* Build & Run setup with Gradle  
* Dummy GitHub Actions workflow (always passes, real CI/CD to be added later)  

---

## 🔮 Next Steps (Future Work)

* Add Entities + Repositories + Services (connect PostgreSQL)  
* Add Validation & DTOs  
* Add Global Exception Handling  
* Add Security (JWT/Keycloak) if needed  
* Add proper CI/CD pipeline in GitHub Actions  

---

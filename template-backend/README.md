# Template Backend

A Spring Boot template backend project implementing a hexagonal architecture (Clean Architecture) for habit tracking.

## 🛠 Technology Stack

- **Language:** Java 21
- **Framework:** Spring Boot 4.0.0
- **Build Tool:** Maven
- **Database:** PostgreSQL
- **Migrations:** Flyway
- **Documentation:** Springdoc OpenAPI (Swagger)
- **Utilities:** MapStruct, Lombok, Hibernate Validator
- **Containerization:** Docker (for local database)

## 📋 Requirements

- **Java JDK 21**
- **Maven** (optional, uses `./mvnw` wrapper)
- **Docker & Docker Compose** (for local database)

## 🚀 Setup and Installation

### 1. Database Setup
The project uses Docker to run a PostgreSQL instance locally.

```bash
docker-compose -f docker/template-local/docker-compose.yml up -d
```
The database will be available at `localhost:5433` with the following credentials:
- **User:** `admin`
- **Password:** `123456`
- **Database:** `tfg_db`

### 2. Install Dependencies
```bash
./mvnw clean install
```

## 🏃 Running the Application

### Using Maven
```bash
./mvnw spring-boot:run
```

### From JAR
1. Build the project:
   ```bash
   ./mvnw package
   ```
2. Run the JAR:
   ```bash
   java -jar target/template-backend-0.0.1-SNAPSHOT.jar
   ```

The application starts on `http://localhost:8080` by default.

## 📖 API Documentation

Once the application is running, you can access the Swagger UI at:
`http://localhost:8080/swagger-ui.html`

## 📁 Project Structure

The project follows a Hexagonal Architecture pattern:

```text
src/main/java/com/example/templatebackend/
├── habit/               # Habit module
│   ├── application/     # Application services
│   ├── domain/          # Domain models and port definitions
│   └── infrastructure/  # Adapters (Controllers, Persistence)
├── habitLog/            # Habit Logging module
│   ├── application/
│   ├── domain/
│   └── infrastructure/
├── user/                # User management module
│   ├── application/
│   ├── domain/
│   └── infrastructure/
└── TemplateBackendApplication.java  # Main entry point
```

## ⚙️ Environment Variables & Configuration

Configuration is located in `src/main/resources/application.properties`.

Key configurations:
- `spring.datasource.url`: JDBC URL (default: `jdbc:postgresql://localhost:5433/tfg_db`)
- `spring.datasource.username`: DB Username (default: `admin`)
- `spring.datasource.password`: DB Password (default: `123456`)
- `spring.flyway.enabled`: Enable/Disable Flyway migrations (default: `true`)

## 🧪 Testing

Run all tests using Maven:
```bash
./mvnw test
```

## 📜 Available Scripts

- `./mvnw`: Maven wrapper for builds and execution.
- `docker/template-local/docker-compose.yml`: Local infrastructure setup.

## 📄 License

TODO: Specify license (e.g., MIT, Apache 2.0). Currently not specified.

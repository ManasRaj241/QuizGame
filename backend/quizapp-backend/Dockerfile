# Use Gradle image for build
FROM gradle:8.9.0-jdk21 AS build
WORKDIR /app
COPY . .
RUN gradle clean build -x test

# Use JDK image for running the app
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

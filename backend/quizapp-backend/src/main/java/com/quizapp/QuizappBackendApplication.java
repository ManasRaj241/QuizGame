package com.quizapp;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Quiz Application", version = "1.0", description = "All The Quiz APIs"))
public class QuizappBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizappBackendApplication.class, args);
	}

}

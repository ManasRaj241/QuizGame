package com.quizapp.configs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Quiz App API")
                        .description("Backend API for Quiz Application - Spring Boot 3 + OpenAPI")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Manas Ranjan Satapathy")
                                .email("manasranjansatapathy96@gmail.com")
                                .url("https://github.com/ManasRaj241"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://springdoc.org")));
    }
}

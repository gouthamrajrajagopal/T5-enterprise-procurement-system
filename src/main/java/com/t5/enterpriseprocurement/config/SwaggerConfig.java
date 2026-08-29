package com.t5.enterpriseprocurement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI procurementAPI() {

        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()

                .info(new Info()

                        .title("Enterprise Procurement System API")

                        .version("1.0")

                        .description("REST APIs for Enterprise Procurement Management System")

                        .contact(new Contact()

                                .name("T5 Team")

                                .email("support@enterpriseprocurement.com")))

                .addSecurityItem(
                        new SecurityRequirement().addList(securitySchemeName))

                .components(new Components()

                        .addSecuritySchemes(
                                securitySchemeName,

                                new SecurityScheme()

                                        .name(securitySchemeName)

                                        .type(SecurityScheme.Type.HTTP)

                                        .scheme("bearer")

                                        .bearerFormat("JWT")));
    }
}
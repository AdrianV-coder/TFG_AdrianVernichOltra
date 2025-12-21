package com.example.templatebackend.user.domain.model;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record UserRecord(UUID id,
                         @NotBlank(message = "Email cannot be empty") String email,
                         @NotBlank(message = "Username cannot be empty") String username) {
}

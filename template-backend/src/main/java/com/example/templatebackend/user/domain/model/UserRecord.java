package com.example.templatebackend.user.domain.model;

import jakarta.validation.constraints.NotBlank;

public record UserRecord(Integer id,
                         @NotBlank(message = "Email cannot be empty") String email,
                         @NotBlank(message = "Username cannot be empty") String username, Long version) {
}

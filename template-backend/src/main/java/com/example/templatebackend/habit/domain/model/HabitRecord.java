package com.example.templatebackend.habit.domain.model;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.UUID;

public record HabitRecord(UUID id,
                          UUID userId,
                          @NotBlank(message = "Name cannot be empty") String name,
                          @NotBlank(message = "Description cannot be empty") String description,
                          LocalDate createdAt) {
}

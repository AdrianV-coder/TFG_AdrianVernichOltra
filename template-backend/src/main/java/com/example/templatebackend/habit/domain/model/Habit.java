package com.example.templatebackend.habit.domain.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
public class Habit {
  private UUID id;
  private UUID userId;

  @NotBlank(message = "Name cannot be blank")
  private String name;

  @NotBlank(message = "Description cannot be blank")
  @Size(max = 255, message = "Description must be less than 255 characters")
  private String description;

  @NotNull
  private LocalDate createdAt = LocalDate.now();
}

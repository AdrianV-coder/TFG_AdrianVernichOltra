package com.example.templatebackend.habit.domain.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class Habit {
  private Integer id;
  private Integer userId;

  @NotBlank(message = "Name cannot be blank")
  private String name;

  @NotBlank(message = "Description cannot be blank")
  @Size(max = 255, message = "Description must be less than 255 characters")
  private String description;

  @NotNull
  private LocalDate createdAt = LocalDate.now();

  private Long version;
}

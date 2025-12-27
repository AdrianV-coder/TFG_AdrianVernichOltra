package com.example.templatebackend.habitLog.domain.model;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class HabitLog {

  private Integer id;

  @NotNull
  private Integer habitId;

  @NotNull
  private LocalDate date;

  @NotNull
  private Boolean completed;
}
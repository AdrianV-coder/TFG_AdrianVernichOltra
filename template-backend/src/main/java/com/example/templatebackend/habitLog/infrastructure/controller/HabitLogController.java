package com.example.templatebackend.habitLog.infrastructure.controller;

import com.example.templatebackend.habitLog.domain.model.HabitLog;
import com.example.templatebackend.habitLog.domain.ports.in.HabitLogUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/habit-logs")
@RequiredArgsConstructor
@Tag(
    name = "HabitLog",
    description = "Operations related to habit daily tracking"
)
public class HabitLogController {

  private final HabitLogUseCase habitLogUseCase;

  @Operation(
      summary = "Mark or update a habit for a specific date",
      description = "Creates or updates the completion status of a habit for a given day"
  )
  @PostMapping
  public HabitLog markHabit(@RequestParam Integer habitId, @RequestParam LocalDate date, @RequestParam boolean completed) {
    return habitLogUseCase.markHabit(habitId, date, completed);
  }

  @Operation(
      summary = "Get all logs of a habit",
      description = "Returns all registered logs for a specific habit"
  )
  @GetMapping("/habit/{habitId}")
  public List<HabitLog> getByHabit(@PathVariable Integer habitId) {
    return habitLogUseCase.findByHabit(habitId);
  }

  @Operation(
      summary = "Get habit logs within a date range",
      description = "Returns the habit logs between two dates for statistics and charts"
  )
  @GetMapping("/habit/{habitId}/range")
  public List<HabitLog> getByRange(@PathVariable Integer habitId, @RequestParam LocalDate start, @RequestParam LocalDate end) {
    return habitLogUseCase.findByHabitAndRange(habitId, start, end);
  }
}

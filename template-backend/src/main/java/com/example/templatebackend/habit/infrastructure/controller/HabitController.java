package com.example.templatebackend.habit.infrastructure.controller;

import com.example.templatebackend.habit.domain.model.Habit;
import com.example.templatebackend.habit.domain.model.HabitRecord;
import com.example.templatebackend.habit.domain.ports.in.HabitUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/habits")
@RequiredArgsConstructor
@Tag(
    name = "Habit",
    description = "Habit operations")
public class HabitController {
  private final HabitUseCase habitUseCase;

  @GetMapping
  @Operation(
      description = "Get all habits",
      summary = "Get all habits")
  public ResponseEntity<List<Habit>> findAll() {
    return ResponseEntity.ok(habitUseCase.findAll());
  }

  @GetMapping("/user/{userId}")
  @Operation(
      description = "Get habits by userId",
      summary = "Get habits by userId")
  public ResponseEntity<List<Habit>> findByUserId(@PathVariable UUID userId) {
    return ResponseEntity.ok(habitUseCase.findByUserId(userId));
  }

  @GetMapping("/{id}")
  @Operation(
      description = "Get habit by id",
      summary = "Get habit by id")
  public ResponseEntity<Habit> findById(@PathVariable UUID id) {
    return ResponseEntity.ok(habitUseCase.findById(id));
  }

  @GetMapping("/{id}/record")
  @Operation(
      description = "Get habit record by id",
      summary = "Get habit record by id")
  public ResponseEntity<HabitRecord> findByIdRecord(@PathVariable UUID id) {
    return ResponseEntity.ok(habitUseCase.findByIdRecord(id));
  }

  @PostMapping
  @Operation(
      description = "Create new habit",
      summary = "Create new habit")
  public ResponseEntity<Habit> create(@Valid @RequestBody Habit habit) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(habitUseCase.create(habit));
  }

  @PutMapping("/{id}")
  @Operation(
      description = "Update habit",
      summary = "Update habit")
  public ResponseEntity<Habit> update(@PathVariable UUID id, @Valid @RequestBody Habit habit) {
    return ResponseEntity.ok(habitUseCase.update(id, habit));
  }

  @DeleteMapping("/{id}")
  @Operation(
      description = "Delete habit",
      summary = "Delete habit")
  public ResponseEntity<Void> delete(@PathVariable UUID id) {
    habitUseCase.delete(id);
    return ResponseEntity.noContent().build();
  }
}

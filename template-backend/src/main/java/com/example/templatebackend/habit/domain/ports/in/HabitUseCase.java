package com.example.templatebackend.habit.domain.ports.in;

import com.example.templatebackend.habit.domain.model.Habit;
import com.example.templatebackend.habit.domain.model.HabitRecord;

import java.util.List;
import java.util.UUID;

public interface HabitUseCase {
  Habit findById(UUID id);

  HabitRecord findByIdRecord(UUID id);

  List<Habit> findAll();

  List<Habit> findByUserId(UUID userId);

  Habit create(Habit habit);

  Habit update(UUID id, Habit habit);

  void delete(UUID id);
}

package com.example.templatebackend.habit.domain.ports.out;

import com.example.templatebackend.habit.domain.model.Habit;
import com.example.templatebackend.habit.domain.model.HabitRecord;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HabitRepository {
  Optional<Habit> findById(UUID id);

  Optional<HabitRecord> findByIdRecord(UUID id);

  List<Habit> findAll();

  List<Habit> findByUserId(UUID userId);

  Habit save(Habit habit);

  Habit update(UUID id, Habit habit);

  void deleteById(UUID id);
}

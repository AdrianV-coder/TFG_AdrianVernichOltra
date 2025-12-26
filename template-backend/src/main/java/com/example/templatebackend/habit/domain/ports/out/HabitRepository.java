package com.example.templatebackend.habit.domain.ports.out;

import com.example.templatebackend.habit.domain.model.Habit;
import com.example.templatebackend.habit.domain.model.HabitRecord;

import java.util.List;
import java.util.Optional;

public interface HabitRepository {
  Optional<Habit> findById(Integer id);

  Optional<HabitRecord> findByIdRecord(Integer id);

  List<Habit> findAll();

  List<Habit> findByUserId(Integer userId);

  Habit save(Habit habit);

  Habit update(Integer id, Habit habit);

  void deleteById(Integer id);
}

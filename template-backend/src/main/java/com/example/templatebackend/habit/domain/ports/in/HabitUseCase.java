package com.example.templatebackend.habit.domain.ports.in;

import com.example.templatebackend.habit.domain.model.Habit;
import com.example.templatebackend.habit.domain.model.HabitRecord;

import java.util.List;

public interface HabitUseCase {
  Habit findById(Integer id);

  HabitRecord findByIdRecord(Integer id);

  List<Habit> findAll();

  List<Habit> findByUserId(Integer userId);

  Habit create(Habit habit);

  Habit update(Integer id, Habit habit);

  void delete(Integer id);
}

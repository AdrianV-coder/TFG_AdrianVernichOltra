package com.example.templatebackend.habitLog.domain.ports.in;

import com.example.templatebackend.habitLog.domain.model.HabitLog;

import java.time.LocalDate;
import java.util.List;

public interface HabitLogUseCase {

  HabitLog markHabit(Integer habitId, LocalDate date, boolean completed);

  List<HabitLog> findByHabit(Integer habitId);

  List<HabitLog> findByHabitAndRange(Integer habitId, LocalDate start, LocalDate end);

  void delete(Integer id);
}
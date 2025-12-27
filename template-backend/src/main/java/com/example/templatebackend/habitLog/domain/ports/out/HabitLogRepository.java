package com.example.templatebackend.habitLog.domain.ports.out;

import com.example.templatebackend.habitLog.domain.model.HabitLog;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HabitLogRepository {

  Optional<HabitLog> findByHabitAndDate(Integer habitId, LocalDate date);

  List<HabitLog> findByHabit(Integer habitId);

  List<HabitLog> findByHabitAndRange(Integer habitId, LocalDate start, LocalDate end);

  HabitLog save(HabitLog habitLog);

  void deleteById(Integer id);
}
package com.example.templatebackend.habitLog.application;

import com.example.templatebackend.habitLog.domain.model.HabitLog;
import com.example.templatebackend.habitLog.domain.ports.in.HabitLogUseCase;
import com.example.templatebackend.habitLog.domain.ports.out.HabitLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitLogService implements HabitLogUseCase {

  private final HabitLogRepository habitLogRepository;

  @Override
  public HabitLog markHabit(Integer habitId, LocalDate date, boolean completed) {
    return habitLogRepository.findByHabitAndDate(habitId, date)
        .map(existing -> {
          existing.setCompleted(completed);
          return habitLogRepository.save(existing);
        })
        .orElseGet(() -> {
          HabitLog log = new HabitLog();
          log.setHabitId(habitId);
          log.setDate(date);
          log.setCompleted(completed);
          return habitLogRepository.save(log);
        });
  }

  @Override
  public List<HabitLog> findByHabit(Integer habitId) {
    return habitLogRepository.findByHabit(habitId);
  }

  @Override
  public List<HabitLog> findByHabitAndRange(Integer habitId, LocalDate start, LocalDate end) {
    return habitLogRepository.findByHabitAndRange(habitId, start, end);
  }

  @Override
  public void delete(Integer id) {
    habitLogRepository.deleteById(id);
  }
}
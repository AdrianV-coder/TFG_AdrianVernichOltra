package com.example.templatebackend.habitLog.application;

import com.example.templatebackend.habit.infrastructure.persistence.jpa.HabitJpaRepository;
import com.example.templatebackend.habit.infrastructure.persistence.jpa.entity.HabitEntity;
import com.example.templatebackend.habitLog.domain.model.HabitLog;
import com.example.templatebackend.habitLog.domain.ports.in.HabitLogUseCase;
import com.example.templatebackend.habitLog.domain.ports.out.HabitLogRepository;
import com.example.templatebackend.habitLog.infrastructure.persistence.jpa.HabitLogJpaRepository;
import com.example.templatebackend.habitLog.infrastructure.persistence.jpa.entity.HabitLogEntity;
import com.example.templatebackend.habitLog.infrastructure.persistence.jpa.mapper.HabitLogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitLogService implements HabitLogUseCase {

  private final HabitLogRepository habitLogRepository;
  private final HabitLogJpaRepository habitLogJpaRepository;
  private final HabitJpaRepository habitJpaRepository;
  private final HabitLogMapper habitLogMapper;

  @Override
  public HabitLog markHabit(Integer habitId, LocalDate date, boolean completed) {
    // 1) comprobar que el hábito existe
    HabitEntity habit = habitJpaRepository.findById(habitId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Habit not found: " + habitId));

    // 2) buscar si ya existe log para (habitId, date)
    HabitLogEntity entity = habitLogJpaRepository.findByHabit_IdAndDate(habitId, date)
        .orElseGet(HabitLogEntity::new);

    // 3) setear valores (si existía, esto es UPDATE; si no, INSERT)
    entity.setHabit(habit);
    entity.setDate(date);
    entity.setCompleted(completed);

    // 4) guardar
    HabitLogEntity saved = habitLogJpaRepository.save(entity);
    return habitLogMapper.toModel(saved);
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
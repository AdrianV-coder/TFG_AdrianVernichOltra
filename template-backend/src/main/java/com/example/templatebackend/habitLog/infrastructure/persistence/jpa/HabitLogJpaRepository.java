package com.example.templatebackend.habitLog.infrastructure.persistence.jpa;

import com.example.templatebackend.habitLog.infrastructure.persistence.jpa.entity.HabitLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HabitLogJpaRepository extends JpaRepository<HabitLogEntity, Integer> {

  Optional<HabitLogEntity> findByHabit_IdAndDate(Integer habitId, LocalDate date);

  List<HabitLogEntity> findByHabit_Id(Integer habitId);

  List<HabitLogEntity> findByHabit_IdAndDateBetween(Integer habitId, LocalDate start, LocalDate end);
}
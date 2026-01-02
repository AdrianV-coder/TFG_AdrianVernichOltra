package com.example.templatebackend.habit.infrastructure.persistence.jpa;

import com.example.templatebackend.habit.infrastructure.persistence.jpa.entity.HabitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitJpaRepository extends JpaRepository<HabitEntity, Integer> {
  List<HabitEntity> findByUser_Id(Integer userId);
}

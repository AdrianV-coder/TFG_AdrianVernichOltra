package com.example.templatebackend.habitLog.infrastructure.persistence.jpa.entity;

import com.example.templatebackend.habit.infrastructure.persistence.jpa.entity.HabitEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(
    name = "habit_logs",
    uniqueConstraints = @UniqueConstraint(columnNames = {"habit_id", "date"})
)
public class HabitLogEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "habit_id", nullable = false)
  private HabitEntity habit;

  @Column(nullable = false)
  private LocalDate date;

  @Column(nullable = false)
  private Boolean completed;
}
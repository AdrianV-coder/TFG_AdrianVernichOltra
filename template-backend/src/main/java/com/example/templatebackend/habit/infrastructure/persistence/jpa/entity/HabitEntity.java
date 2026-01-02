package com.example.templatebackend.habit.infrastructure.persistence.jpa.entity;

import com.example.templatebackend.user.infrastructure.persistence.jpa.entity.UserEntity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "habits")
public class HabitEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private Integer id;

  @Version
  @Column(name = "version", nullable = false)
  private Long version = 0L;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description", nullable = false)
  private String description;

  @Column(name = "created_at", nullable = false)
  private LocalDate createdAt = LocalDate.now();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(
      name = "user_id",
      nullable = false)
  private UserEntity user;
}

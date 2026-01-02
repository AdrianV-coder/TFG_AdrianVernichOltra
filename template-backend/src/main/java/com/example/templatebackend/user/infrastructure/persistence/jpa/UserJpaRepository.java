package com.example.templatebackend.user.infrastructure.persistence.jpa;

import com.example.templatebackend.user.infrastructure.persistence.jpa.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<UserEntity, Integer> {
  Optional<UserEntity> findByUsername(String username);

}

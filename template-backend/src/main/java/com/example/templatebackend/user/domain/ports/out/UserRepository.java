package com.example.templatebackend.user.domain.ports.out;

import com.example.templatebackend.user.domain.model.User;
import com.example.templatebackend.user.domain.model.UserRecord;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
  Optional<User> findById(Integer id);

  Optional<UserRecord> findByIdRecord(Integer id);

  Optional<User> findByUsername(String username);

  List<User> findAll();

  User save(User post);

  User update(Integer id,
              User post);

  void deleteById(Integer id);
}

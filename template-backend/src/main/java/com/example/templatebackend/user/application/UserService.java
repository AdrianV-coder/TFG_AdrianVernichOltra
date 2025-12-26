package com.example.templatebackend.user.application;

import com.example.templatebackend.user.domain.model.User;
import com.example.templatebackend.user.domain.model.UserRecord;
import com.example.templatebackend.user.domain.ports.in.UserUseCase;
import com.example.templatebackend.user.domain.ports.out.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserUseCase {

  private final UserRepository userRepository;

  @Override
  public User findById(Integer id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User not found by id: " + id
        ));
  }

  @Override
  public UserRecord findByIdRecord(Integer id) {
    return userRepository.findByIdRecord(id)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User not found by idRecord: " + id
        ));
  }

  @Override
  public List<User> findAll() {
    return userRepository.findAll();
  }

  @Override
  public User findByUsername(String username) {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User not found by username: " + username
        ));
  }

  @Override
  public User create(User user) {
    return userRepository.save(user);
  }

  @Override
  public User update(Integer id, User user) {
    user.setId(id);
    return userRepository.update(id, user);
  }

  @Override
  public void delete(Integer id) {
    userRepository.deleteById(id);
  }
}

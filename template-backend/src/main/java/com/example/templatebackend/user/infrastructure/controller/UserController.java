package com.example.templatebackend.user.infrastructure.controller;

import com.example.templatebackend.user.domain.model.User;
import com.example.templatebackend.user.domain.model.UserRecord;
import com.example.templatebackend.user.domain.ports.in.UserUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(
    name = "User",
    description = "User operations"
)
@RequestMapping("/users")
public class UserController {
  private final UserUseCase userUseCase;

  @Operation(
      description = "Get all Users",
      summary = "Get all Users"
  )
  @GetMapping
  public ResponseEntity<List<User>> findAll() {

    return ResponseEntity.ok(userUseCase.findAll());
  }

  @Operation(
      description = "Get users with an username",
      summary = "Get users with an username"
  )
  @GetMapping("/by-username")
  public ResponseEntity<User> findByUsername(@RequestParam String username) {

    return ResponseEntity.ok(userUseCase.findByUsername(username));
  }

  @Operation(
      description = "Get users with an id",
      summary = "Get users with an id"
  )
  @GetMapping("/id/{id}")
  public ResponseEntity<User> findById(@PathVariable Integer id) {

    return ResponseEntity.ok(userUseCase.findById(id));
  }

  @Operation(
      description = "Get userRecords with an id",
      summary = "Get userRecords with an id"
  )
  @GetMapping("/{id}/record")
  public ResponseEntity<UserRecord> findByIdRecord(@PathVariable Integer id) {

    return ResponseEntity.ok(userUseCase.findByIdRecord(id));
  }

  @Operation(
      description = "Create new user",
      summary = "Create new user"
  )
  @PostMapping
  public ResponseEntity<User> save(@Valid @RequestBody User user) {

    return ResponseEntity.status(HttpStatus.CREATED)
        .body(userUseCase.create(user));
  }

  @Operation(
      description = "Edit user",
      summary = "Edit user"
  )
  @PutMapping("/{id}")
  public ResponseEntity<User> update(@PathVariable Integer id,
                                     @Valid @RequestBody User user) {

    return ResponseEntity.ok(userUseCase.update(id, user));
  }

  @Operation(
      description = "Delete a user with the id",
      summary = "Delete a user with the id"
  )
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Integer id) {
    userUseCase.delete(id);
    return ResponseEntity.noContent().build();
  }
}


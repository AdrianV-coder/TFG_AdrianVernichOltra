package com.example.templatebackend.user.domain.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
  private Integer id;

  @NotBlank(message = "Username cannot be empty")
  @Size(
      max = 255,
      message = "Username must be less than 255 characters"
  )
  private String username;

  @Email(message = "Email must be valid")
  @NotBlank(message = "Email cannot be empty")
  private String email;

  @NotBlank(message = "Password cannot be empty")
  private String password;

  private Long version;
}

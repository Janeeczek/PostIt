package com.jm.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UserDto {
    @NotBlank(message = "Username is mandatory")
    @Length(max = 40, min = 5, message = "Username should have from 5 to 40 characters")
    private String username;
    @NotBlank(message = "Password is mandatory")
    @Length(max = 40, min = 5, message = "Password should have from 5 to 40 characters")
    private String password;
}

package com.jm.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class NoteDto {

    @NotBlank(message = "Title is mandatory")
    @Length(max = 100, message = "Title cannot have more then 100 characters")
    private String title;
    @Length(max = 200, message = "Content cannot have more then 100 characters")
    private String content;
}

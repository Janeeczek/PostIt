package com.jm.backend.controller;

import com.jm.backend.model.Note;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/note")
@CrossOrigin("*")
@RequiredArgsConstructor
public class NoteController {
    @PostMapping("/add")
    public ResponseEntity<Note> addNote(@RequestBody Note note) {
        try {
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

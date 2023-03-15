package com.jm.backend.controller;

import com.jm.backend.dto.NoteDto;
import com.jm.backend.model.Note;
import com.jm.backend.model.User;
import com.jm.backend.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/note")
@CrossOrigin()
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @PostMapping("/add")
    public ResponseEntity<Note> addNote(@Valid @RequestBody NoteDto noteDto, Authentication authentication) {
        try {
            noteService.addNote(noteDto, (User) authentication.getPrincipal());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<Note> editNote(@Valid @RequestBody NoteDto noteDto, Authentication authentication, @PathVariable() Long id) {
        try {
            noteService.editNote(noteDto, id, (User) authentication.getPrincipal());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Note> deleteNote(Authentication authentication, @PathVariable() Long id) {
        try {
            noteService.deleteNote(id, (User) authentication.getPrincipal());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Note>> allNotes(Authentication authentication) {
        try {
            var allNotes = noteService.allNotes((User) authentication.getPrincipal());
            return new ResponseEntity<>(allNotes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

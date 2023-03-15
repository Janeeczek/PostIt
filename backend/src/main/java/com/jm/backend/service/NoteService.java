package com.jm.backend.service;

import com.jm.backend.dto.NoteDto;
import com.jm.backend.model.Note;
import com.jm.backend.model.User;
import com.jm.backend.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;

    public Note addNote(NoteDto noteDto, User user) {
        Note note = new Note();
        note.setText(noteDto.getContent());
        note.setTitle(noteDto.getTitle());
        note.setCreatedAt(new Date());
        note.setUser(user);
        return noteRepository.save(note);
    }

    public List<Note> allNotes(User details) {
        return noteRepository.findByUser_IdOrderByCreatedAtDesc(details.getId());
    }

    public void deleteNote(Long id, User principal) throws Exception {
        Note oldNote = noteRepository.findById(id).orElseThrow(() -> new Exception("Note does not exist - " + id));
        if (oldNote.getUser().getId() != principal.getId())
            throw new Exception("This note does not belong to user - " + id);
        noteRepository.delete(oldNote);
    }

    public Note editNote(NoteDto noteDto, Long id, User principal) throws Exception {
        Note oldNote = noteRepository.findById(id).orElseThrow(() -> new Exception("Note does not exist - " + id));
        if (oldNote.getUser().getId() != principal.getId())
            throw new Exception("This note does not belong to user - " + id);
        if (!noteDto.getContent().isEmpty()) oldNote.setText(noteDto.getContent());
        if (!noteDto.getTitle().isEmpty()) oldNote.setTitle(noteDto.getTitle());
        return noteRepository.save(oldNote);
    }
}

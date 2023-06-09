package com.jm.backend.repository;

import com.jm.backend.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUser_IdOrderByCreatedAtDesc(Long id);

}

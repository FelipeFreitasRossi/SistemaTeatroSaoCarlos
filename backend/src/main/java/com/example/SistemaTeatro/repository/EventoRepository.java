package com.example.SistemaTeatro.repository;

import com.example.SistemaTeatro.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByStatus(String status);
}
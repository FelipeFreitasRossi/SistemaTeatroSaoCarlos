package com.example.SistemaTeatro.controller;

import com.example.SistemaTeatro.dto.EventoDTO;
import com.example.SistemaTeatro.service.EventoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping("/publicos")
    public ResponseEntity<List<EventoDTO>> listarPublicos() {
        return ResponseEntity.ok(eventoService.listarPublicos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(eventoService.buscarPorId(id));
    }

    @GetMapping("/admin/todos")
    public ResponseEntity<List<EventoDTO>> listarTodos() {
        return ResponseEntity.ok(eventoService.listarTodos());
    }

    @PostMapping("/admin")
    public ResponseEntity<EventoDTO> criar(@Valid @RequestBody EventoDTO dto) {
        EventoDTO novo = eventoService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<EventoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody EventoDTO dto) {
        EventoDTO atualizado = eventoService.atualizar(id, dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        eventoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
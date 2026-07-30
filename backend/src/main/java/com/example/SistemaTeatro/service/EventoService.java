package com.example.SistemaTeatro.service;

import com.example.SistemaTeatro.dto.EventoDTO;
import com.example.SistemaTeatro.model.Evento;
import com.example.SistemaTeatro.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    private Evento toEntity(EventoDTO dto) {
        Evento evento = new Evento();
        evento.setId(dto.getId());
        evento.setTitulo(dto.getTitulo());
        evento.setDescricao(dto.getDescricao());
        evento.setDataHora(dto.getDataHora());
        evento.setLocal(dto.getLocal());
        evento.setImagemUrl(dto.getImagemUrl());
        evento.setCapacidadeTotal(dto.getCapacidadeTotal());
        evento.setIngressosDisponiveis(dto.getCapacidadeTotal());
        evento.setStatus(dto.getStatus() != null ? dto.getStatus() : "BREVE");
        return evento;
    }

    private EventoDTO toDTO(Evento evento) {
        return new EventoDTO(
                evento.getId(),
                evento.getTitulo(),
                evento.getDescricao(),
                evento.getDataHora(),
                evento.getLocal(),
                evento.getImagemUrl(),
                evento.getCapacidadeTotal(),
                evento.getIngressosDisponiveis(),
                evento.getStatus()
        );
    }

    public List<EventoDTO> listarTodos() {
        return eventoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<EventoDTO> listarPublicos() {
        List<Evento> eventos = eventoRepository.findByStatus("EM_CARTAZ");
        eventos.addAll(eventoRepository.findByStatus("BREVE"));
        return eventos.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public EventoDTO buscarPorId(Long id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado!"));
        return toDTO(evento);
    }

    public EventoDTO criar(EventoDTO dto) {
        Evento evento = toEntity(dto);
        Evento salvo = eventoRepository.save(evento);
        return toDTO(salvo);
    }

    public EventoDTO atualizar(Long id, EventoDTO dto) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado!"));

        evento.setTitulo(dto.getTitulo());
        evento.setDescricao(dto.getDescricao());
        evento.setDataHora(dto.getDataHora());
        evento.setLocal(dto.getLocal());
        evento.setImagemUrl(dto.getImagemUrl());
        evento.setCapacidadeTotal(dto.getCapacidadeTotal());
        evento.setStatus(dto.getStatus());

        Evento atualizado = eventoRepository.save(evento);
        return toDTO(atualizado);
    }

    public void deletar(Long id) {
        eventoRepository.deleteById(id);
    }
}
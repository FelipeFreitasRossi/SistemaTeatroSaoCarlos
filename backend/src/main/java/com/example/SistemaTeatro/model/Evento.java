package com.example.SistemaTeatro.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "eventos")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false, length = 2000)
    private String descricao;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @Column(nullable = false, length = 100)
    private String local;

    @Column(length = 500)
    private String imagemUrl;

    @Column(nullable = false)
    private Integer capacidadeTotal;

    private Integer ingressosDisponiveis;

    @Column(nullable = false)
    private String status;

    // ========== NOVO CAMPO ==========
    @Column(length = 255)
    private String localVendaIngressos;
}
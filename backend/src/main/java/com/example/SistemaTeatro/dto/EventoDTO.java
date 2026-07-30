package com.example.SistemaTeatro.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventoDTO {

    private Long id;

    @NotBlank(message = "O título é obrigatório")
    private String titulo;

    @NotBlank(message = "A descrição é obrigatória")
    private String descricao;

    @NotNull(message = "A data e hora são obrigatórias")
    private LocalDateTime dataHora;

    @NotBlank(message = "O local é obrigatório")
    private String local;

    private String imagemUrl;

    @NotNull(message = "A capacidade total é obrigatória")
    @Positive(message = "A capacidade deve ser maior que zero")
    private Integer capacidadeTotal;

    private Integer ingressosDisponiveis;

    private String status;
}
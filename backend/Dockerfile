# 1. Etapa de Build: Usa o Maven com JDK 17 para compilar o projeto
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo de configuração do Maven e o código fonte
COPY pom.xml .
COPY src ./src

# Executa o comando para gerar o arquivo .jar (pula os testes para ser mais rápido)
RUN mvn clean package -DskipTests

# 2. Etapa de Execução: Usa uma imagem leve do JDK 17 para rodar a aplicação
FROM eclipse-temurin:17-jre-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo .jar gerado na etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Documenta que a aplicação vai rodar na porta 8080
EXPOSE 8080

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]